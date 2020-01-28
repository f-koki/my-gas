function add_new_sheet_sync_with_cal() {
  var cal = CalendarApp.getCalendarById('fukushimakoki0108@gmail.com');
  var events = cal.getEventsForDay(new Date())
  events.forEach(function (event) {
    if (event.getTitle().match('[DEFPAY]')) {
      var ss = SpreadsheetApp.getActive()
      var originSheet = ss.getSheetByName('origin')
      if (!originSheet) {
        throw new Error("origin sheet doesn't exists")
      }
      var newSheet = originSheet.copyTo(ss)
      newSheet.setName('today')
      newSheet.activate()
      // change active sheet
      SpreadsheetApp.getActive().moveActiveSheet(1)
    }
  })
}

// 参照するGoogle Calendar ID
const REFERENCE_CAL_ID = ''
// trackする予定のタイトルに含まれる文字列
const KEYWORD = '[Defpay Product]'
// コピーするシートの名前
const ORIGIN_SHEET_NAME = '(template)'

function copy_template_sync_with_calendar() {
  var cal = CalendarApp.getCalendarById();
  var events = cal.getEventsForDay(new Date())
  events.forEach(function (event) {
    if (event.getTitle().match(KEYWORD)) {
      var ss = SpreadsheetApp.getActive()
      var originSheet = ss.getSheetByName(ORIGIN_SHEET_NAME)
      if (!originSheet) {
        throw new Error("origin sheet doesn't exists")
      }
      var newSheet = originSheet.copyTo(ss)
      newSheet.setName(createSheetNameByDate(new Date()))
      newSheet.activate()
      // change active sheet
      SpreadsheetApp.getActive().moveActiveSheet(1)
    }
  })
}

function createSheetNameByDate(date) {
  var lastDate = new Date(date.setDate(date.getDate() - 1))
  var startDate = new Date(date.setDate(date.getDate() - 6))
  var sheetName = getDateString(startDate) + " - " + getDateString(lastDate)
  return sheetName
}

function getDateString(date) {
  return (date.getMonth() + 1).toString() + "/" + (date.getDate())
}