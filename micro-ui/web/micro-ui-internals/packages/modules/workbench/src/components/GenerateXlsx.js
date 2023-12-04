import React from "react";
import XLSX from "xlsx";

const GenerateXlsx = ({ inputRef, jsonData }) => {
  const handleExport = () => {
    // Sample JSON data
    const data = jsonData || [
      {
        code: "WBH_MDMS_MASTER_ACCESSCONTROL_ACTIONS_TEST",
        message: "Access Control",
        module: "rainmaker-workbench",
        locale: Digit.Utils.getDefaultLanguage(),
      },
    ];

    const simplifiedData = data.map((item) => item.boundaryType);

    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet([simplifiedData], { skipHeader: true });

    // const ws = jsonData ? XLSX.utils.aoa_to_sheet([simplifiedData]) : XLSX.utils.json_to_sheet(data);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook as an XLSX file
    XLSX.writeFile(wb, "template.xlsx");
  };

  return (
    <div style={{ display: "none" }}>
      <h1>JSON to XLSX Converter</h1>
      <button ref={inputRef} onClick={handleExport}>
        Export to XLSX
      </button>
    </div>
  );
};

export default GenerateXlsx;
