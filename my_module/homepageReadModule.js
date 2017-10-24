/*
* data_list 는 데이터가 저장될 곳.
* select 는  1이면 일반 / 2이면 학사 /3이면 장학

*/


exports.updateHomepageData=function(data_list,select) {
     'use strict';

var async    = require('async');
//var feed     = require("feed-read");
var dateTime = require('./dateTime');
var commonMessage = require('../common/commonMessage');
const rss = require('simple-rss')



var url;


  if(select ===1 )    //temp
    url = commonMessage.regRSS //일반
  else if(select ===2)
    url = commonMessage.studyRSS  //학사
  else
    url = commonMessage.encourageRSS   //장학




const tasks = [
      /*
      * 1번함수
      * 사이트로부터 데이터를 읽어옴
      */
      function(callback){
        var jsonResult=[];


        rss(url)
        .then((posts) => {



      for(var i=0;i<10;i++){
          var pubDate = new Date(posts[i].date);
          var pubTime = pubDate.getHours() + ":" + pubDate.getMinutes();

          pubDate = pubDate.getFullYear() + "-" + (pubDate.getMonth() + 1) + "-" + pubDate.getDate();
          pubDate = dateTime.convertFormatGeorgian(pubDate);


          jsonResult.push({
              "title": posts[i].title,
          //    "content" : item.content,
          //    "link": item.link,
              "date": pubDate,
              "time": pubTime,
          });


        }

          callback(null,jsonResult);






        })

      },
      /*
      * 2번함수
      * 읽어온 데이터 파싱
      */
      function(jsonResult,callback){
        //테이블 초기화
        if(data_list.length==10)
            data_list.length=0;



          for(var i=0;i<10;i++)
          {
                data_list.push({"data":'작성일 : '+jsonResult[i].date+'\n'+jsonResult[i].title+'\n\n'})
                //db 인서트
          }
            callback(null);
      }



    ];
    async.waterfall(tasks, function(err){
      if (!err) {
      //  console.info('Homepage Updated');
      } else {
        console.error(err);
      }
    });
}
