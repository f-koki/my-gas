function postSlack(text) {
  var url = '';
  var options = {
    "method": "POST",
    "headers": { "Content-type": "application/json" },
    "payload": '{"text":"' + text + '"}'
  };
  UrlFetchApp.fetch(url, options);
}

// リマインドメッセージ
function doMessage(e) {
  var message = "hello world!!!";
  postSlack(message);
}

// slackの入力を受け取る
function doPost(e) {
  postSlack("入力完了");
}


// SpreadSheetに書き込む
function record(data) {
  var recordsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('記録'); // 記録シートを取得; 

  var lastrow = recordsheet.getLastRow();
  var recordrow = lastrow + 1;

  var date = new Date();
  var formatdate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd');
  var lastrecorddate = recordsheet.getRange("A" + lastrow).getValue();
  var formatlastrecorddate = Utilities.formatDate(lastrecorddate, 'Asia/Tokyo', 'yyyy/MM/dd');

  if (formatdate == formatlastrecorddate) {
    recordrow = lastrow;
  }

  //最終行の次の行に入力する
  recordsheet.getRange("A" + recordrow).setValue(formatdate);
  recordsheet.getRange("B" + recordrow).setValue(data[0]);
  recordsheet.getRange("C" + recordrow).setValue(data[1]);
  recordsheet.getRange("D" + recordrow).setValue(data[2]);
}