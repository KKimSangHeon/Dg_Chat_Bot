// http://its.gyeongju.go.kr/busLineInfo.do


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
exports.processByBusStopId=function(res,v_content,commonMessage,commonFunction,async,request,busStopId){
  //동국대병원방향

  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }


  var options = {
      url: 'http://its.gyeongju.go.kr/bstopLineBusArriveInfoAjax.do',
      method: 'POST',
      headers: headers,
      form: { 'bStopid': busStopId}
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

        commonFunction.sendMessageWithButton(res,temp,commonMessage.I_init_buttons);
    }
  })
}

exports.processCoin=function(res,commonFunction,request,async){


  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }
  var options = {
      url: 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-ADA',
      method: 'GET',
      headers: headers,
  }

  const tasks = [
      function(callback){
        var temp='';
      request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              // Print out the response body

              var jsonContent=  JSON.parse(body);

              var resString='에이다: '+jsonContent[0].openingPrice+'\n';
              temp=resString;

              callback(null,temp);
          }
        })

      },

      function(temp, callback) {
          options.url = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-XRP'

          request(options, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  var jsonContent=  JSON.parse(body);

                  var resString ='리플: '+jsonContent[0].openingPrice+'\n';
                  temp+=resString;
                  callback(null,temp);
              }
            })
          },
          function(temp, callback) {
            options.url = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-QTUM'

            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonContent=  JSON.parse(body);

                    var resString ='퀀텀: '+jsonContent[0].openingPrice+'\n';
                    temp+=resString;
                    callback(null,temp);
                }
              })
            },
            function(temp, callback) {
                options.url = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-SNT'

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // Print out the response body

                        var jsonContent=  JSON.parse(body);

                        var resString ='스테이터스네트워크: '+jsonContent[0].openingPrice+'\n';
                        temp+=resString;

                        callback(null,temp);
                    }
                  })
                },
                function(temp, callback) {
                    options.url = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-XLM'

                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            // Print out the response body

                            var jsonContent=  JSON.parse(body);

                            var resString ='스텔라루멘: '+jsonContent[0].openingPrice+'\n';
                            temp+=resString;

                                commonFunction.sendMessage(res,temp);

                            callback(null);
                        }
                      })
                    }


  ];

  async.waterfall(tasks, function(err){
    if (!err) {
  
    } else {
      console.error(err);
    }
  });




}
