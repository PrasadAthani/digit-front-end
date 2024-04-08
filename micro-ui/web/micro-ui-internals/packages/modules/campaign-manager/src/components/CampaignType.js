import React, { useState, useMemo, useRef, useEffect } from "react";
import { UploadIcon, FileIcon, DeleteIconv2, Toast, Card, Header, Dropdown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { LabelFieldPair } from "@egovernments/digit-ui-react-components";

const CampaignType = ({ onSelect, formData, ...props }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getStateId();
  const { isLoading, data: projectType } = Digit.Hooks.useCustomMDMS("mz", "HCM-PROJECT-TYPES", [{ name: "projectTypes" }]);
  const [type, setType] = useState(props?.props?.sessionData?.HCM_CAMPAIGN_TYPE?.projectType || {});
  const [beneficiaryType, setBeneficiaryType] = useState(props?.props?.sessionData?.HCM_CAMPAIGN_TYPE?.projectType?.beneficiaryType || "");
  const [showBeneficiary, setShowBeneficiaryType] = useState(Boolean(props?.props?.sessionData?.HCM_CAMPAIGN_TYPE?.projectType?.beneficiaryType));
  const handleChange = (data) => {
    setType(data);
    setBeneficiaryType(data?.beneficiaryType);
    setShowBeneficiaryType(true);
  };

  useEffect(() => {
    onSelect("projectType", type);
  }, [type]);

  return (
    <React.Fragment>
      <Header>{t(`HCM_CAMPAIGN_TYPE_HEADER`)}</Header>
      <p className="description-type">{t(`HCM_CAMPAIGN_TYPE_DESCRIPTION`)}</p>
      <LabelFieldPair>
        <div className="campaign-type">
          <span>{`${t("HCM_CAMPAIGN_TYPE")}`}</span>
          <span className="mandatory-span">*</span>
        </div>
        <Dropdown
          style={{ width: "50%" }}
          t={t}
          option={[{
            code : "Nabeel"
          }]}
          optionKey={"code"}
          selected={type}
          select={(value) => {
            handleChange(value);
          }}
        />
      </LabelFieldPair>
      {showBeneficiary && (
        <LabelFieldPair>
          <div className="beneficiary-type">{`${t("HCM_BENEFICIARY_TYPE")}`}</div>
          <div>{beneficiaryType}</div>
        </LabelFieldPair>
      )}
    </React.Fragment>
  );
};

export default CampaignType;
