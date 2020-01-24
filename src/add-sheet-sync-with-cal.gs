function add_new_sheet_sync_with_cal() {
  var cal = CalendarApp.getCalendarById('fukushimakoki0108@gmail.com');
  var events = cal.getEventsForDay(new Date())
  events.forEach(function (event) {
    if(event.getTitle().match('[DEFPAY]')) {
      var ss = SpreadsheetApp.getActive()
      var originSheet = ss.getSheetByName('origin')
      if(!originSheet) {
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
