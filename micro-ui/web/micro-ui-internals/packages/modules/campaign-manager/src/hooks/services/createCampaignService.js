const createCampaignService = async (req, tenantId) => {
  console.log("SERVICE", req, tenantId);
  try {
    const response = await Digit.CustomService.getResponse({
      url: "/project-factory/v1/project-type/create",
      body: {
        CampaignDetails: req,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default createCampaignService;
