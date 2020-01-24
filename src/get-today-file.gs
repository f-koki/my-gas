function get_today_spread_sheet() {
  const today = new Date()
  const todaySuffix = today.getYear().toString() + today.getMonth() + today.getDate()
  const teamMember = ['fukushima', 'kajimoto']
  teamMember.forEach(function (name) {
    const files = DriveApp.getFilesByName('scoring' + '_' + name + '_' + todaySuffix)
    const ss = files.next()
    const url = ss.getUrl()
    // TODO: urlを特定のメアドに送る
  })
}