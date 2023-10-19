import { DownwardArrow, Rating, RefreshIcon, UpwardArrow } from "@egovernments/digit-ui-react-components";
import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import FilterContext from "./FilterContext";
//import {ReactComponent as Arrow_Downward} from "../images/Arrow_Downward.svg";
import { ArrowDownwardElement } from "./ArrowDownward";
import { ArrowUpwardElement } from "./ArrowUpward";
import { Loader } from "@egovernments/digit-ui-react-components";

const MetricData = ({ t, data, code }) => {
  const { value } = useContext(FilterContext);
  const insight = data?.insight?.value?.replace(/[+-]/g, "")?.split('%');
  return (
    <div>
      <p className="heading-m" style={{ textAlign: "right", paddingTop: "0px", whiteSpace: "nowrap" }}>
        {code === "citizenAvgRating" ? (
          <Rating currentRating={Math.round(data?.headerValue * 10) / 10} styles={{ width: "unset" }} starStyles={{ width: "25px" }} />
        ) : (
          `${Digit.Utils.dss.formatter(data?.headerValue, data?.headerSymbol, value?.denomination, true, t)} ${code === "totalSludgeTreated" ? t(`DSS_KL`) : ""
          }`
        )}
      </p>
      {data?.insight && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          {data?.insight?.indicator === "upper_green" ? ArrowUpwardElement("10px") : ArrowDownwardElement("10px")}
          <p className={`${data?.insight.colorCode}`} style={{ whiteSpace: "pre" }}>
            {insight?.[0] && `${Digit.Utils.dss.formatter(insight[0], 'number', value?.denomination, true, t)}% ${t(Digit.Utils.locale.getTransformedLocale('DSS' + insight?.[1] || ""))}`}
          </p>
        </div>
      )}
    </div>
  );
};

const ColumnMetricData = ({ data, setChartDenomination, index, Refetch, setRefetch, refetchInterval, refetchMetric, setRefetchMetric }) => {
  const { id, chartType } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const { value } = useContext(FilterContext);
  const [showDateOrCount, setShowDateOrCount] = useState({});
  const isMobile = window.Digit.Utils.browser.isMobile();
  const [isVisible, setisVisible] = useState(false);
  const chartRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (chartRef.current) {
        const chartRect = chartRef.current.getBoundingClientRect();
        const isChartInViewport = chartRect.top < window.innerHeight;

        if (isChartInViewport) {
          setisVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { isLoading, data: response, refetch } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate: { ...value?.requestDate, startDate: value?.range?.startDate?.getTime(), endDate: value?.range?.endDate?.getTime() },
    filters: value?.filters,
    moduleLevel: value?.moduleLevel,
    isVisible: isVisible,
    refetchInterval,
  });

  useEffect(() => {
    if (response) {
      let plots = response?.responseData?.data?.[0]?.plots || null;
      if (plots && Array.isArray(plots) && plots.length > 0 && plots?.every((e) => e.value))
        setShowDateOrCount(oldstate => ({
          ...oldstate, [id]: {
            todaysDate: Digit.DateUtils.ConvertEpochToDate(plots?.[0]?.value),
            lastUpdatedTime: Digit.DateUtils.ConvertEpochToTimeInHours(plots?.[1]?.value),
            count: plots?.[2]?.value
          }
        }));
      index === 0 && setChartDenomination(response?.responseData?.data?.[0]?.headerSymbol);
    } else {
      setShowDateOrCount({});
    }
  }, [response]);
  if (Refetch && isVisible) {
    refetch();
    setTimeout(() => {
      setRefetch(0);
    }, 100);
  }
  if (refetchMetric && isVisible) {
    refetch();
    setTimeout(() => {
      setRefetchMetric(false);
    }, 100);
  }


  return (
    <div ref={chartRef} style={{ marginLeft: "8px", marginRight: "8px", maxWidth: "21%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {(isLoading || Refetch || refetchMetric) ? (<Loader />) : (
        <div>
          {response ? <p className="heading-m" style={{ textAlign: "center", paddingTop: "0px", wordWrap: "break-word", paddingBottom: "0px", marginLeft: "0px", marginBottom: "0px" }}>
            {`${Digit.Utils.dss.formatter(response?.responseData?.data?.[0]?.headerValue, response?.responseData?.data?.[0]?.headerSymbol, value?.denomination, true, t)}`}
          </p> : <div style={{ whiteSpace: "pre" }}>{t("DSS_NO_DATA")}</div>}
          <div className={`tooltip`} style={{ marginLeft: "42px", paddingLeft: "32px" }}>
            <span
              className="tooltiptext"
              style={{
                fontSize: "medium",
                width: "max-content",
                minWidth: t(`TIP_${data.name}`).length < 20 ? t(`TIP_${data.name}`).length * 4 : 120,
                maxWidth: 400,
                whiteSpace: "normal",
                visibility: "visible"
              }}
            >
              <span style={{ fontWeight: "500", color: "white" }}>{t(`TIP_${data.name}`)}</span>
            </span>
          </div>
          <div style={{ textAlign: "center", paddingTop: "0px", wordWrap: "break-word" }}>{`${response?.responseData?.data?.[0]?.plots?.[2]?.value != 0 ? `${response?.responseData?.data?.[0]?.plots?.[2]?.value} ` : ""}${t(`${data.name}`)}`}</div>
        </div>
      )}

    </div>

  );

};

const MetricChartRow = ({ data, setChartDenomination, index, Refetch, setRefetch, refetchInterval, refetchMetric, setRefetchMetric }) => {
  const { id, chartType } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const { value } = useContext(FilterContext);
  const [showDate, setShowDate] = useState({});
  const isMobile = window.Digit.Utils.browser.isMobile();
  const [isVisible, setisVisible] = useState(false);
  const chartRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (chartRef.current) {
        const chartRect = chartRef.current.getBoundingClientRect();
        const isChartInViewport = chartRect.top < window.innerHeight;

        if (isChartInViewport) {
          setisVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { isLoading, data: response, refetch } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate: { ...value?.requestDate, startDate: value?.range?.startDate?.getTime(), endDate: value?.range?.endDate?.getTime() },
    filters: value?.filters,
    moduleLevel: value?.moduleLevel,
    isVisible: isVisible,
    refetchInterval,
  });

  useEffect(() => {
    if (response) {
      let plots = response?.responseData?.data?.[0]?.plots || null;
      if (plots && Array.isArray(plots) && plots.length > 0 && plots?.every((e) => e.value))
        setShowDate(oldstate => ({
          ...oldstate, [id]: {
            todaysDate: Digit.DateUtils.ConvertEpochToDate(plots?.[0]?.value),
            lastUpdatedTime: Digit.DateUtils.ConvertEpochToTimeInHours(plots?.[1]?.value),
          }
        }));
      index === 0 && setChartDenomination(response?.responseData?.data?.[0]?.headerSymbol);
    } else {
      setShowDate({});
    }
  }, [response]);

  if (Refetch && isVisible) {
    refetch();
    setTimeout(() => {
      setRefetch(0);
    }, 100);
  }
  if (refetchMetric && isVisible) {
    refetch();
    setTimeout(() => {
      setRefetchMetric(false);
    }, 100);
  }

  if (!response) {
    return (
      <div ref={chartRef} className="row">
        <div className={`tooltip`} >
          {t(data.name)}
          <span
            className="tooltiptext"
            style={{
              fontSize: "medium",
              width: t(`TIP_${data.name}`).length < 50 ? "fit-content" : 400,
              height: 50,
              whiteSpace: "normal",
            }}
          >
            <span style={{ fontWeight: "500", color: "white" }}>{t(`TIP_${data.name}`)}</span>
          </span>
        </div>
        <span style={{ whiteSpace: "pre" }}>{t("DSS_NO_DATA")}</span>
      </div>
    );
  }
  let name = t(data?.name) || "";

  const getWidth = (data) => {
    if (isMobile) return "auto";
    else return t(`TIP_${data.name}`).length < 50 ? "fit-content" : 400;
    // if (isMobile) return t(`TIP_${data.name}`).length < 50 ? "fit-content" : 300;
    // else return t(`TIP_${data.name}`).length < 50 ? "fit-content" : 400;
  }

  const getHeight = (data) => {
    if (isMobile) return "auto";
    else return 50;
    // if (isMobile) return t(`TIP_${data.name}`).length < 50 ? 50 : "auto";
    // else return 50;
  }

  return (
    <div className="row">
      {(isLoading || Refetch || refetchMetric) ? (<Loader />) : (
        <div div ref={chartRef} className="row">
          <div className={`tooltip`}>
            {typeof name == "string" && name}
            {Array.isArray(name) && name?.filter(ele => ele)?.map(ele => <div style={{ whiteSpace: "pre" }}>{ele}</div>)}
            <span className="dss-white-pre" style={{ display: "block" }}> {showDate?.[id]?.todaysDate}</span>
            <span
              className="tooltiptext"
              style={{
                fontSize: "medium",
                width: getWidth(data),
                height: getHeight(data),
                whiteSpace: "normal",
              }}
            >
              <span style={{ fontWeight: "500", color: "white" }}>{t(`TIP_${data.name}`)}</span>
              <span style={{ color: "white" }}> {showDate?.[id]?.lastUpdatedTime}</span>
            </span>
          </div>
          <MetricData t={t} data={response?.responseData?.data?.[0]} code={response?.responseData?.visualizationCode} />
          {/* <div>{`${displaySymbol(response.headerSymbol)} ${response.headerValue}`}</div> */}
        </div>
      )}
    </div>

  );
};

const MetricChart = ({ data, setChartDenomination, Refetch, setRefetch, refetchInterval }) => {
  const { charts } = data;
  const [refetchMetric, setRefetchMetric] = useState(false);
  return (
    <>
      <span className={`chart-metric-wrapper`} style={data?.isHorizontalChart ? { flexWrap: "wrap", display: "flex", justifyContent: "space-evenly" } : { flexWrap: "wrap", display: "flex" }}>
        <div style={{ cursor: "pointer", alignSelf: "flex-start", width: "100%", marginTop: "-20px", marginBottom: "15px" }} onClick={(event) => {
          event.stopPropagation(); // Prevent the click event from bubbling up to the div
          setRefetchMetric(true);
        }}><RefreshIcon className="mrsm" fill="#f18f5e" /></div>
        {charts.map((chart, index) => (

          data?.isHorizontalChart ? (
            <ColumnMetricData refetchMetric={refetchMetric} setRefetchMetric={setRefetchMetric} data={chart} key={index} index={index} setChartDenomination={setChartDenomination} Refetch={Refetch} setRefetch={setRefetch} refetchInterval={refetchInterval} />
          ) : (
            <MetricChartRow refetchMetric={refetchMetric} setRefetchMetric={setRefetchMetric} data={chart} key={index} index={index} setChartDenomination={setChartDenomination} Refetch={Refetch} setRefetch={setRefetch} refetchInterval={refetchInterval} />
          )
        ))}
      </span>
    </>
  );
};

export default MetricChart;
