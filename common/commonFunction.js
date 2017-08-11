
/*
*   메세지만 보내는 함수
*/
exports.sendMessage = function(res,message) {
  res.status(200).send(
    {
       message: {
            text: message
            }
    }
  );
}

/*
* 메시지, 버튼을 보내는 함수
*/
exports.sendMessageWithButton = function(res,message,buttons) {
  res.status(200).send(
    {
       message: {
            text: message
                },
       keyboard: {
         type: 'buttons',
         buttons: buttons
       }
    }
  );
}


/*
* 메시지, 버튼,링크를 보내는 함수
*/
exports.sendMessageWithButtonAndLabel = function(res,message,buttons,label,url) {
  res.status(200).send(
    {
       message: {
            text: message,

            "message_button": {
              "label":label,
              "url": url
            }
                },
       keyboard: {
         type: 'buttons',
         buttons: buttons
       }
    }
  );
}

/*
* 문자를 합치는 함수
* 매개변수 호출규칙 지킬것.
* 처음 매개변수는 배열에서 뽑을것.
* 그 이외 매개변수는 리스트 일것.
*/
exports.mergeString = function() {
  var merged=[arguments[0]];
  var index=1;


  for(var i=1;i<arguments.length;i++)
  {
      for(var j=0;j<arguments[i].length;j++)
        {
            merged[index]=arguments[i][j];
            index++;
        }
  }
  return merged;
}



/*
* 서버콘솔출력을 위해 시간 구해오는 함수
*/
exports.getTime=function(){
  var d = new Date();

   var s =
     exports.leadingZeros(d.getFullYear(), 4) + '-' +
     exports.leadingZeros(d.getMonth() + 1, 2) + '-' +
     exports.leadingZeros(d.getDate(), 2) + ' ' +

     exports.leadingZeros(d.getHours(), 2) + ':' +
     exports.leadingZeros(d.getMinutes(), 2) + ':' +
     exports.leadingZeros(d.getSeconds(), 2);

   return s;

}

exports.leadingZeros=function(n,digits){
  var zero = '';
   n = n.toString();

   if (n.length < digits) {
     for (i = 0; i < digits - n.length; i++)
       zero += '0';
   }
   return zero + n;
}
