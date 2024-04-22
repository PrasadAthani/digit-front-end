import config from "../config";
import { v4 as uuidv4 } from 'uuid';
import { httpRequest } from "../utils/request";
import { logger } from "../utils/logger";
import createAndSearch from '../config/createAndSearch';
import { getDataFromSheet, matchData, generateActivityMessage, throwError } from "../utils/genericUtils";
import { validateSheetData } from '../utils/validators/campaignValidators';
import { getCampaignNumber, getWorkbook } from "./genericApis";
import { autoGenerateBoundaryCodes, convertToTypeData, generateHierarchy, generateProcessedFileAndPersist } from "../utils/campaignUtils";
import axios from "axios";
const _ = require('lodash');
import * as XLSX from 'xlsx';



/**
 * Enriches the campaign data with unique IDs and generates campaign numbers.
 * @param requestBody The request body containing the campaign data.
 */
async function enrichCampaign(requestBody: any) {
  // Enrich campaign data with unique IDs and generate campaign numbers
  if (requestBody?.Campaign) {
    requestBody.Campaign.id = uuidv4();
    requestBody.Campaign.campaignNo = await getCampaignNumber(requestBody, config.values.idgen.format, config.values.idgen.idName, requestBody?.Campaign?.tenantId);
    for (const campaignDetails of requestBody?.Campaign?.CampaignDetails) {
      campaignDetails.id = uuidv4();
    }
  }
}

async function getAllFacilitiesInLoop(searchedFacilities: any[], facilitySearchParams: any, facilitySearchBody: any) {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
  logger.info("facilitySearchParams : " + JSON.stringify(facilitySearchParams));
  const response = await httpRequest(config.host.facilityHost + config.paths.facilitySearch, facilitySearchBody, facilitySearchParams);

  if (Array.isArray(response?.Facilities)) {
    searchedFacilities.push(...response?.Facilities);
    return response.Facilities.length >= 50; // Return true if there are more facilities to fetch, false otherwise
  } else {
    throwError("FACILITY", 500, "FACILITY_SEARCH_FAILED");
    return false;
  }
}

/**
 * Retrieves all facilities for a given tenant ID.
 * @param tenantId The ID of the tenant.
 * @param requestBody The request body containing additional parameters.
 * @returns An array of facilities.
 */
async function getAllFacilities(tenantId: string, requestBody: any) {
  // Retrieve all facilities for the given tenant ID
  const facilitySearchBody = {
    RequestInfo: requestBody?.RequestInfo,
    Facility: { isPermanent: true }
  };

  const facilitySearchParams = {
    limit: 50,
    offset: 0,
    tenantId: tenantId?.split('.')?.[0]
  };

  logger.info("Facility search url : " + config.host.facilityHost + config.paths.facilitySearch);
  logger.info("facilitySearchBody : " + JSON.stringify(facilitySearchBody));
  const searchedFacilities: any[] = [];
  let searchAgain = true;

  while (searchAgain) {
    searchAgain = await getAllFacilitiesInLoop(searchedFacilities, facilitySearchParams, facilitySearchBody);
    facilitySearchParams.offset += 50;
  }

  return searchedFacilities;
}

/**
 * Retrieves facilities by their IDs.
 * @param tenantId The ID of the tenant.
 * @param ids An array of facility IDs.
 * @param requestBody The request body containing additional parameters.
 * @returns An array of facilities.
 */
async function getFacilitiesViaIds(tenantId: string, ids: any[], requestBody: any) {
  // Retrieve facilities by their IDs
  const facilitySearchBody: any = {
    RequestInfo: requestBody?.RequestInfo,
    Facility: {}
  };

  const facilitySearchParams = {
    limit: 50,
    offset: 0,
    tenantId: tenantId?.split('.')?.[0]
  };

  logger.info("Facility search url : " + config.host.facilityHost + config.paths.facilitySearch);
  const searchedFacilities: any[] = [];

  // Split ids into chunks of 50
  for (let i = 0; i < ids.length; i += 50) {
    const chunkIds = ids.slice(i, i + 50);
    facilitySearchBody.Facility.id = chunkIds;
    logger.info("facilitySearchBody : " + JSON.stringify(facilitySearchBody));
    await getAllFacilitiesInLoop(searchedFacilities, facilitySearchParams, facilitySearchBody);
  }

  return searchedFacilities;
}

/**
 * Retrieves parameters based on elements.
 * @param elements An array of elements.
 * @param request The HTTP request object.
 * @returns Parameters extracted from elements.
 */
function getParamsViaElements(elements: any, request: any) {
  // Extract parameters based on elements
  var params: any = {};
  if (!elements) {
    return params;
  }
  for (const element of elements) {
    if (element?.isInParams) {
      if (element?.value) {
        _.set(params, element?.keyPath, element?.value);
      }
      else if (element?.getValueViaPath) {
        _.set(params, element?.keyPath, _.get(request.body, element?.getValueViaPath))
      }
    }
  }
  return params
}

/**
 * Changes request body based on elements.
 * @param elements An array of elements.
 * @param requestBody The request body to be modified.
 */
function changeBodyViaElements(elements: any, requestBody: any) {
  // Modify request body based on elements
  if (!elements) {
    return;
  }
  for (const element of elements) {
    if (element?.isInBody) {
      if (element?.value) {
        _.set(requestBody, element?.keyPath, element?.value);
      }
      else if (element?.getValueViaPath) {
        _.set(requestBody, element?.keyPath, _.get(requestBody, element?.getValueViaPath))
      }
      else {
        _.set(requestBody, element?.keyPath, {})
      }
    }
  }
}

function changeBodyViaSearchFromSheet(elements: any, request: any, dataFromSheet: any) {
  if (!elements) {
    return;
  }
  for (const element of elements) {
    const arrayToSearch = []
    for (const data of dataFromSheet) {
      if (data[element.sheetColumnName]) {
        arrayToSearch.push(data[element.sheetColumnName]);
      }
    }
    _.set(request.body, element?.searchPath, arrayToSearch);
  }
}

function updateErrors(newCreatedData: any[], newSearchedData: any[], errors: any[], createAndSearchConfig: any) {
  newCreatedData.forEach((createdElement: any) => {
    let foundMatch = false;
    for (const searchedElement of newSearchedData) {
      let match = true;
      for (const key in createdElement) {
        if (createdElement.hasOwnProperty(key) && !searchedElement.hasOwnProperty(key) && key != '!row#number!') {
          match = false;
          break;
        }
        if (createdElement[key] !== searchedElement[key] && key != '!row#number!') {
          match = false;
          break;
        }
      }
      if (match) {
        foundMatch = true;
        newSearchedData.splice(newSearchedData.indexOf(searchedElement), 1);
        errors.push({ status: "CREATED", rowNumber: createdElement["!row#number!"], isUniqueIdentifier: true, uniqueIdentifier: searchedElement[createAndSearchConfig.uniqueIdentifier], errorDetails: "" })
        break;
      }
    }
    if (!foundMatch) {
      errors.push({ status: "NOT_CREATED", rowNumber: createdElement["!row#number!"], errorDetails: `Can't confirm creation of this data` })
      logger.info("Can't confirm creation of this data of row number : " + createdElement["!row#number!"]);
    }
  });
}

function matchCreatedAndSearchedData(createdData: any[], searchedData: any[], request: any, createAndSearchConfig: any, activities: any) {
  const newCreatedData = JSON.parse(JSON.stringify(createdData));
  const newSearchedData = JSON.parse(JSON.stringify(searchedData));
  const uid = createAndSearchConfig.uniqueIdentifier;
  newCreatedData.forEach((element: any) => {
    delete element[uid];
  })
  var errors: any[] = []
  updateErrors(newCreatedData, newSearchedData, errors, createAndSearchConfig);
  request.body.sheetErrorDetails = request?.body?.sheetErrorDetails ? [...request?.body?.sheetErrorDetails, ...errors] : errors;
  request.body.Activities = activities
}
function matchViaUserIdAndCreationTime(createdData: any[], searchedData: any[], request: any, creationTime: any, createAndSearchConfig: any, activities: any) {
  var matchingSearchData = [];
  const userUuid = request?.body?.RequestInfo?.userInfo?.uuid
  var count = 0;
  for (const data of searchedData) {
    if (data?.auditDetails?.createdBy == userUuid && data?.auditDetails?.createdTime >= creationTime) {
      matchingSearchData.push(data);
      count++;
    }
  }
  if (count < createdData.length) {
    request.body.ResourceDetails.status = "PERSISTER_ERROR"
  }
  matchCreatedAndSearchedData(createdData, matchingSearchData, request, createAndSearchConfig, activities);
  logger.info("New created resources count : " + count);
}

async function processSearch(createAndSearchConfig: any, request: any, params: any) {
  setSearchLimits(createAndSearchConfig, request, params);
  logger.info("Search url : " + createAndSearchConfig?.searchDetails?.url);

  const arraysToMatch = await performSearch(createAndSearchConfig, request, params);

  return arraysToMatch;
}

function setSearchLimits(createAndSearchConfig: any, request: any, params: any) {
  setLimitOrOffset(createAndSearchConfig?.searchDetails?.searchLimit, params, request.body);
  setLimitOrOffset(createAndSearchConfig?.searchDetails?.searchOffset, params, request.body);
}

function setLimitOrOffset(limitOrOffsetConfig: any, params: any, requestBody: any) {
  if (limitOrOffsetConfig) {
    if (limitOrOffsetConfig?.isInParams) {
      _.set(params, limitOrOffsetConfig?.keyPath, parseInt(limitOrOffsetConfig?.value));
    }
    if (limitOrOffsetConfig?.isInBody) {
      _.set(requestBody, limitOrOffsetConfig?.keyPath, parseInt(limitOrOffsetConfig?.value));
    }
  }
}

async function performSearch(createAndSearchConfig: any, request: any, params: any) {
  const arraysToMatch: any[] = [];
  let searchAgain = true;

  while (searchAgain) {
    const searcRequestBody = {
      RequestInfo: request?.body?.RequestInfo
    }
    changeBodyViaElements(createAndSearchConfig?.searchDetails?.searchElements, searcRequestBody)
    logger.info("Search url : " + createAndSearchConfig?.searchDetails?.url);
    logger.info("Search params : " + JSON.stringify(params));
    logger.info("Search body : " + JSON.stringify(searcRequestBody));
    const response = await httpRequest(createAndSearchConfig?.searchDetails?.url, searcRequestBody, params);
    const resultArray = _.get(response, createAndSearchConfig?.searchDetails?.searchPath);
    if (resultArray && Array.isArray(resultArray)) {
      arraysToMatch.push(...resultArray);
      if (resultArray.length < parseInt(createAndSearchConfig?.searchDetails?.searchLimit?.value)) {
        searchAgain = false;
      }
    } else {
      searchAgain = false;
    }
    updateOffset(createAndSearchConfig, params, request.body);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  return arraysToMatch;
}

function updateOffset(createAndSearchConfig: any, params: any, requestBody: any) {
  const offsetConfig = createAndSearchConfig?.searchDetails?.searchOffset
  const limit = createAndSearchConfig?.searchDetails?.searchLimit?.value
  if (offsetConfig) {
    if (offsetConfig?.isInParams) {
      _.set(params, offsetConfig?.keyPath, parseInt(_.get(params, offsetConfig?.keyPath) + parseInt(limit)));
    }
    if (offsetConfig?.isInBody) {
      _.set(requestBody, offsetConfig?.keyPath, parseInt(_.get(requestBody, offsetConfig?.keyPath) + parseInt(limit)));
    }
  }
}

async function processSearchAndValidation(request: any, createAndSearchConfig: any, dataFromSheet: any[]) {
  if (request?.body?.dataToSearch?.length > 0) {
    const params: any = getParamsViaElements(createAndSearchConfig?.searchDetails?.searchElements, request);
    changeBodyViaElements(createAndSearchConfig?.searchDetails?.searchElements, request)
    changeBodyViaSearchFromSheet(createAndSearchConfig?.requiresToSearchFromSheet, request, dataFromSheet)
    const arraysToMatch = await processSearch(createAndSearchConfig, request, params)
    matchData(request, request.body.dataToSearch, arraysToMatch, createAndSearchConfig)
  }
}


/**
 * Confirms the creation of resources by matching created and searched data.
 * @param createAndSearchConfig The configuration for create and search operations.
 * @param request The HTTP request object.
 * @param facilityCreateData An array of data for created facilities.
 * @param creationTime The timestamp of creation.
 * @param activities An array of activity logs.
 */
async function confirmCreation(createAndSearchConfig: any, request: any, facilityCreateData: any[], creationTime: any, activities: any) {
  // Confirm creation of resources by matching data  // wait for 5 seconds
  const params: any = getParamsViaElements(createAndSearchConfig?.searchDetails?.searchElements, request);
  const arraysToMatch = await processSearch(createAndSearchConfig, request, params)
  matchViaUserIdAndCreationTime(facilityCreateData, arraysToMatch, request, creationTime, createAndSearchConfig, activities)
}

async function processValidateAfterSchema(dataFromSheet: any, request: any, createAndSearchConfig: any) {
  const typeData = convertToTypeData(dataFromSheet, createAndSearchConfig, request.body)
  request.body.dataToSearch = typeData.searchData;
  await processSearchAndValidation(request, createAndSearchConfig, dataFromSheet)
  await generateProcessedFileAndPersist(request);
}

async function processValidate(request: any) {
  const type: string = request.body.ResourceDetails.type;
  const createAndSearchConfig = createAndSearch[type]
  const dataFromSheet = await getDataFromSheet(request?.body?.ResourceDetails?.fileStoreId, request?.body?.ResourceDetails?.tenantId, createAndSearchConfig)
  await validateSheetData(dataFromSheet, request, createAndSearchConfig?.sheetSchema, createAndSearchConfig?.boundaryValidation)
  processValidateAfterSchema(dataFromSheet, request, createAndSearchConfig)
}

async function performAndSaveResourceActivity(request: any, createAndSearchConfig: any, params: any, type: any) {
  logger.info(type + " create data : " + JSON.stringify(request?.body?.dataToCreate));
  logger.info(type + " bulk create url : " + createAndSearchConfig?.createBulkDetails?.url, params);
  if (createAndSearchConfig?.createBulkDetails?.limit) {
    const limit = createAndSearchConfig?.createBulkDetails?.limit;
    const dataToCreate = request?.body?.dataToCreate;
    const chunks = Math.ceil(dataToCreate.length / limit); // Calculate number of chunks
    const creationTime = Date.now();
    var activities = [];
    for (let i = 0; i < chunks; i++) {
      const start = i * limit;
      const end = (i + 1) * limit;
      const chunkData = dataToCreate.slice(start, end); // Get a chunk of data
      const newRequestBody = {
        RequestInfo: request?.body?.RequestInfo,
      }
      _.set(newRequestBody, createAndSearchConfig?.createBulkDetails?.createPath, chunkData);
      const responsePayload = await httpRequest(createAndSearchConfig?.createBulkDetails?.url, newRequestBody, params, "post", undefined, undefined, true);
      var activity = await generateActivityMessage(request?.body?.ResourceDetails?.tenantId, request.body, newRequestBody, responsePayload, type, createAndSearchConfig?.createBulkDetails?.url, responsePayload?.statusCode)
      logger.info("Activity : " + JSON.stringify(activity));
      activities.push(activity);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    await confirmCreation(createAndSearchConfig, request, dataToCreate, creationTime, activities);
  }
  await generateProcessedFileAndPersist(request);
}

/**
 * Processes generic requests such as create or validate.
 * @param request The HTTP request object.
 */
async function processGenericRequest(request: any) {
  // Process generic requests
  if (request?.body?.ResourceDetails?.action == "create") {
    await processCreate(request)
  }
  else {
    await processValidate(request)
  }
}

async function processAfterValidation(dataFromSheet: any, createAndSearchConfig: any, request: any) {
  const typeData = convertToTypeData(dataFromSheet, createAndSearchConfig, request.body)
  request.body.dataToCreate = typeData.createData;
  request.body.dataToSearch = typeData.searchData;
  await processSearchAndValidation(request, createAndSearchConfig, dataFromSheet)
  if (createAndSearchConfig?.createBulkDetails) {
    _.set(request.body, createAndSearchConfig?.createBulkDetails?.createPath, request?.body?.dataToCreate);
    const params: any = getParamsViaElements(createAndSearchConfig?.createBulkDetails?.createElements, request);
    changeBodyViaElements(createAndSearchConfig?.createBulkDetails?.createElements, request)
    await performAndSaveResourceActivity(request, createAndSearchConfig, params, request.body.ResourceDetails.type);
  }
}

/**
 * Processes the creation of resources.
 * @param request The HTTP request object.
 */
async function processCreate(request: any) {
  // Process creation of resources
  const type: string = request.body.ResourceDetails.type;
  if (type == "boundary") {
    await autoGenerateBoundaryCodes(request);
    await generateProcessedFileAndPersist(request);
  }
  else {
    const createAndSearchConfig = createAndSearch[type]
    const dataFromSheet = await getDataFromSheet(request?.body?.ResourceDetails?.fileStoreId, request?.body?.ResourceDetails?.tenantId, createAndSearchConfig)
    await validateSheetData(dataFromSheet, request, createAndSearchConfig?.sheetSchema, createAndSearchConfig?.boundaryValidation)
    processAfterValidation(dataFromSheet, createAndSearchConfig, request)
  }
}

/**
 * Creates resources for a project campaign.
 * @param request The HTTP request object.
 */
async function createProjectCampaignResourcData(request: any) {
  // Create resources for a project campaign
  if (request?.body?.CampaignDetails?.action == "create" && request?.body?.CampaignDetails?.resources) {
    for (const resource of request?.body?.CampaignDetails?.resources) {
      const resourceDetails = {
        type: resource.type,
        fileStoreId: resource.filestoreId,
        tenantId: request?.body?.CampaignDetails?.tenantId,
        action: "create",
        hierarchyType: request?.body?.CampaignDetails?.hierarchyType,
        additionalDetails: {}
      };
      await axios.post(`${config.host.projectFactoryBff}project-factory/v1/data/_create`, {
        RequestInfo: request.body.RequestInfo,
        ResourceDetails: resourceDetails
      });
    }
  }
}

async function projectCreate(projectCreateBody: any, request: any) {
  logger.info("Project creation url " + config.host.projectHost + config.paths.projectCreate)
  logger.info("Project creation body " + JSON.stringify(projectCreateBody))
  const projectCreateResponse = await httpRequest(config.host.projectHost + config.paths.projectCreate, projectCreateBody);
  logger.info("Project creation response" + JSON.stringify(projectCreateResponse))
  if (projectCreateResponse?.Project[0]?.id) {
    logger.info("Project created successfully with id " + JSON.stringify(projectCreateResponse?.Project[0]?.id))
    request.body.boundaryProjectMapping[projectCreateBody?.Projects?.[0]?.address?.boundary].projectId = projectCreateResponse?.Project[0]?.id
  }
  else {
    throwError("PROJECT", 500, "PROJECT_CREATION_FAILED", "Project creation failed, for the request: " + JSON.stringify(projectCreateBody));
  }
}

function generateHierarchyList(data: any[], parentChain: any = []) {
  let result: any[] = [];

  // Iterate over each boundary in the current level
  for (let boundary of data) {
    let currentChain = [...parentChain, boundary.code];

    // Add the current chain to the result
    result.push(currentChain.join(','));

    // If there are children, recursively call the function
    if (boundary.children && boundary.children.length > 0) {
      let childResults = generateHierarchyList(boundary.children, currentChain);
      result = result.concat(childResults);
    }
  }
  return result;

}

const getHierarchy = async (request: any, tenantId: string, hierarchyType: string) => {
  const url = `${config.host.boundaryHost}${config.paths.boundaryHierarchy}`;

  // Create request body
  const requestBody = {
    "RequestInfo": request?.body?.RequestInfo,
    "BoundaryTypeHierarchySearchCriteria": {
      "tenantId": tenantId,
      "limit": 5,
      "offset": 0,
      "hierarchyType": hierarchyType
    }
  };

  const response = await httpRequest(url, requestBody);
  const boundaryList = response?.BoundaryHierarchy?.[0].boundaryHierarchy;
  return generateHierarchy(boundaryList);
};

const getHeadersOfBoundarySheet = async (fileUrl: string, sheetName: string, getRow = false) => {
  const workbook: any = await getWorkbook(fileUrl, sheetName)
  const columnsToValidate = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    header: 1,
  })[0];
  return columnsToValidate;
}

export {
  enrichCampaign,
  getAllFacilities,
  getFacilitiesViaIds,
  confirmCreation,
  getParamsViaElements,
  changeBodyViaElements,
  processGenericRequest,
  createProjectCampaignResourcData,
  processCreate,
  projectCreate,
  generateHierarchyList,
  getHierarchy,
  getHeadersOfBoundarySheet
};