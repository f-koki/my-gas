function get_ss_date() {
  const files = DriveApp.getFileNameByName('scoring_fukushima_20200120')
  const ss = files.hasNext()
  const ssTest = SpreadsheetApp.getActiveSheet()
}