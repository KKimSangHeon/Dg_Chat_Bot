
exports.wayToGJ1ri=function(res,v_content,commonMessage,commonFunction,async,request){
  //금장1리방향

  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }

  // Configure the request
  var options = {
      url: 'http://its.gyeongju.go.kr/bstopLineBusArriveInfoAjax.do',
      method: 'POST',
      headers: headers,
      form: { 'bStopid': '352000537'}
  }

  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body

          var jsonContent=  JSON.parse(body);
          var obj = jsonContent.busArriveInfoList;

            var temp='';

            for(var i=0;i<obj.length;i++){
              temp += "■ "+obj[i].ROUTE_NAME+"번 버스 ";
              if(obj[i].REMAIN_BSTOP_CNT_VIEW != null)
              {
                temp+=": "+ obj[i].REMAIN_BSTOP_CNT_VIEW;
              }
                temp+="\n-> "+obj[i].REMAIN_MI_VIEW;

                if(i!= obj.length-1){
                  temp += "\n\n";
                }
            }

            if(obj.length==0)
              temp='버스도착정보가 존재하지 않습니다.'

          commonFunction.sendMessageWithButton(res,temp,commonMessage.I_select_BIS);
      }
  })


}

exports.wayToHospital=function(res,v_content,commonMessage,commonFunction,async,request){
  //동국대병원방향

  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }


  var options = {
      url: 'http://its.gyeongju.go.kr/bstopLineBusArriveInfoAjax.do',
      method: 'POST',
      headers: headers,
      form: { 'bStopid': '352000533'}
  }


  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body

        var jsonContent=  JSON.parse(body);
        var obj = jsonContent.busArriveInfoList;

          var temp='';

          for(var i=0;i<obj.length;i++){
            temp += "■ "+obj[i].ROUTE_NAME+"번 버스 ";
            if(obj[i].REMAIN_BSTOP_CNT_VIEW != null)
            {
              temp+=": "+ obj[i].REMAIN_BSTOP_CNT_VIEW;
            }
              temp+="\n-> "+obj[i].REMAIN_MI_VIEW;

              if(i!= obj.length-1){
                temp += "\n\n";
              }
          }

          if(obj.length==0)
            temp='버스도착정보가 존재하지 않습니다.'

        commonFunction.sendMessageWithButton(res,temp,commonMessage.I_select_BIS);
    }
  })
}
