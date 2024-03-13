import XLSX from "xlsx";

// input is a xlsx blob
export const parseXlsxToJsonMultipleSheets = (file, options) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "arraybuffer" });
      const jsonData = {};

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        // const options = { header: 1 };
        const jsonSheetData = XLSX.utils.sheet_to_json(worksheet, options);
        for (let i = 0; i < jsonSheetData.length; i++) {
          for (let j = 0; j < jsonSheetData[i].length; j++) {
            const cell = jsonSheetData[i][j];
            if (typeof cell === "string") {
              jsonSheetData[i][j] = cell.trim();
            }
          }
        }
        jsonData[sheetName] = jsonSheetData;
      });

      resolve(jsonData);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
