import * as Excel from "exceljs/dist/exceljs.min.js";
import { save } from "save-file";
import moment from "moment";
function nextLetter(value) {
  let carry = 1,
    res = "";
  for (let i = value.length - 1; i >= 0; i--) {
    let char = value.toUpperCase().charCodeAt(i);

    char += carry;

    if (char > 90) {
      char = 65;
      carry = 1;
    } else {
      carry = 0;
    }
    res = String.fromCharCode(char) + res;
    if (!carry) {
      res = value.substring(0, i) + res;
      break;
    }
  }

  if (carry) {
    res = "A" + res;
  }

  return res;
}

export const makeExcel = async (data, isRTL) => {
  let workSheetName = data.workSheetName;
  let workbook = new Excel.Workbook();
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 0,
      visibility: "visible",
    },
  ];
  let sheets = [],
    sheet;
  for (let idx = 0; idx < workSheetName.length; idx++) {
    sheets[idx] = workbook.addWorksheet(workSheetName[idx], {
      views: [
        { state: "frozen", xSplit: 1, ySplit: 1 },
        { rightToLeft: isRTL ? true : false },
      ],
    });
  }

  let totalFill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "#263661" },
    bgColor: { argb: "ffffff" },
  };
  let dataAlignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  let dataFont = { name: "Sakkal Majalla", family: 2, size: 12, bold: false };
  let totalFont = {
    name: "Sakkal Majalla",
    family: 2,
    size: 14,
    bold: false,
    color: { argb: "ffffff" },
  };
  let dataBorder = { bottom: { style: "thin" }, left: { style: "thin" } };
  /**-----------------BP--------------------------- */
  let columnTitles = data.columnTitles;
  let columnWidth = data.columnWidth; //2d array

  sheets.map((x, i) => {
    let letter = "A";
    sheet = sheets[i];
    columnWidth[i].map((y, j) => {
      sheet.getColumn(letter).width = y;
      letter = nextLetter(letter);
    });
    sheet.addRow(columnTitles[i]);

    sheet.lastRow.font = totalFont;
    sheet.lastRow.alignment = dataAlignment;
    sheet.lastRow.fill = totalFill;
    sheet.lastRow.border = dataBorder;
    sheet.lastRow.height = 25;
    let rows = data.rows;
    rows[i].map((x) => {
      let oneRow = [""];
      for (let field in x) oneRow.push(x[field]);
      sheet.addRow(oneRow);
      sheet.lastRow.height = 25;
      sheet.lastRow.font = dataFont;
      sheet.lastRow.alignment = dataAlignment;
      // sheet.lastRow.fill=totalFill
      sheet.lastRow.border = dataBorder;
    });
  });

  let buf = await workbook.xlsx.writeBuffer();

  save(
    new Blob([buf]),
    `${data.fileName} ${moment(new Date()).format("DD/MM/YYYY")}.xlsx`
  );
};
