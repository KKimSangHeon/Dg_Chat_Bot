var app = require('./express')();

var keyboardObj = require('./routes/keyboard');
//var messageObj = require('./routes/message');
var friendObj = require('./routes/friend');
var chatroomObj = require('./routes/chat_room');
var commonFunction= require('./common/commonFunction');


//keyboard
app.get('/keyboard', keyboardObj.returnAlive);

//message

var processMessage=require('./routes/processMessage')();
app.use('/message', processMessage);
//app.post('/message1', messageObj.returnPhoto);

//friend
app.post('/friend', friendObj.returnAddFriend);
app.delete('/friend/:user_key', friendObj.returnDelFriend);

//chat_room
app.delete('/chat_room/:user_key', chatroomObj.returnOutChat);

//cron기능 구현
//cron.schedule('*/1 * * * *', function () {
//      console.log('동작함'+new Date());
//}).start();

app.listen(8000);
console.log('['+commonFunction.getTime()+ ' 서버 가동] : 포트 8000');
