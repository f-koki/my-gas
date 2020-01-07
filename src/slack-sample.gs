function postSlack(text){
  var url = "https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXX";
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload" : '{"text":"' + text + '"}'
  };
  UrlFetchApp.fetch(url, options);
}

// 指定した時間にSlackにメッセージをポストする
function doMessage(e) {
  var message = "こんにちは！\n今日は筋トレしたかな？\n`腕立て`,`腹筋`,`スクワット`の回数をスペースで区切って入力してね"; 
  postSlack(message);
}

// Slackからの入力を受け取る
function doPost(e) {
  if (e.parameter.user_name === "slackbot") return; 
  
  var data = e.parameter.text.split(" ");//今回はサクッと作ったのでデータのチェックは一旦保留
  record(data);
  //Slackへ筋トレ管理botからのコメントをポスト
  postSlack("入力完了！\n筋トレ管理botからのコメント：「" + selectRemark() + "」"); 
}

function record (data) {
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

function selectRemark () {
  var remarksheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('言葉');// 言葉シートを取得;
  var random = Math.round( Math.random() * remarksheet.getLastRow()); 
  var remark = remarksheet.getRange("A" + random).getValue();
  return remark;
}