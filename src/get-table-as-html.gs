var SHEET_NAME = "data"

function sendMailWithHtmlTable() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME)
  var range = sheet.getDataRange()
  var html = getHtmlTableFromSheetRange(sheet, range)
  // TODO: メールで送るとかなんとか
}

function getHtmlTableFromSheetRange(sheet, range) {
  var rangeHeight = range.getHeight();
  var rangeWidth = range.getWidth();
  var rangeValue = range.getValues();
  var rangeFontSize = range.getFontSizes();
  var rangeFontColor = range.getFontColors();
  var rangeFontStyle = range.getFontStyles();
  var rangeBackgroundColor = range.getBackgrounds();
  var rangeHAlign = range.getHorizontalAlignments();
  var rangeVAlign = range.getVerticalAlignments();

  var rangeFirstCol = range.getColumn();
  var rangeColWidth = [];

  var htmlTable = "<table>";
  for (i = 0; i < rangeHeight; i++) {
    htmlTable = htmlTable + "<tr>";
    for (j = 0; j < rangeWidth; j++) {
      if (i == 0) {
        rangeColWidth.push(sheet.getColumnWidth(rangeFirstCol + j));
      }
      htmlTable = htmlTable + "<td style = 'overflow-wrap:break-word; width:" + rangeColWidth[j] + "px; text-align:" + rangeHAlign[i][j] + "; vertical-align:" + rangeVAlign[i][j] + "; font-size:" + rangeFontSize[i][j] + "; color:" + rangeFontColor[i][j] + "; font-style:" + rangeFontStyle[i][j] + "; background-color:" + rangeBackgroundColor[i][j] + ";'>" + rangeValue[i][j] + "</td>";
    }
    htmlTable = htmlTable + "</tr>";
  }
  htmlTable = htmlTable + "</table>";

  return htmlTable;
}