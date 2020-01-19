function send_email() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getActiveSheet();
  var ss_name = ss.getName();
  var sh_name = sh.getSheetName();
  var ss_url = ss.getUrl();
  var sh_id = sh.getSheetId();

  var mail_address = Session.getActiveUser().getEmail();
  var subject = ss_name + "/" + sh_name + "のURLです。";
  var message = ss_url + "#gid=" + sh_id;
  MailApp.sendEmail(mail_address, subject, message);
}
