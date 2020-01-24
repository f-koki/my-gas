function send_email() {
  var mail_address = "xxx@gmail.com";
  var subject = "test";
  var message = "message";
  MailApp.sendEmail(mail_address, subject, message);
}

function create_folder() {
  create_daily_folder();
  create_spread_sheet();
}

function create_daily_folder() {
  // 日付作成
  const today = new Date();
  const folderName =
    today.getYear().toString() +
    today.getMonth().toString() +
    today.getDate().toString();
  const todayFolder = DriveApp.createFolder(folderName);

  // TODO: みんなの名前を他のスプレッドシートから配列で取得する
  const teamMember = ["fukushima", "kajimoto"];
  teamMember.forEach(function(name) {
    todayFolder.createFolder(name);
  });
}

function create_spread_sheet() {
  // TODO
}
