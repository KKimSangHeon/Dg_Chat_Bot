/********************************************* 급식 관련 ********************************************/
/********************************************* 급식 관련 ********************************************/
/********************************************* 급식 관련 ********************************************/

var commonFunction = require('../common/commonFunction');
/*
* 식단 데이터 초기화
* 2주일치를 먼저 읽고 오늘것 갱싱
*/

exports.initDormRestaurantData = function (menuArray,todayMenu)
{
  const async = require('async');
  var dormRestaurantCron=require('../my_module/dormRestaurantCronService');


  const tasks = [
      function(callback){
        setTimeout(function () {
          dormRestaurantCron.updateMenu(menuArray);
          callback(null,menuArray);
        }, 1000);
      },

      function(menuArray, callback) {
        setTimeout(function () {
          dormRestaurantCron.updateTodayMenu(menuArray,todayMenu);
          callback(null);
          }, 1000);
      }
  ];

  async.waterfall(tasks, function(err){
    if (!err) {
      console.log('['+commonFunction.getTime()+ ' 초기화 완료] : 급식 데이터 갱신 및 오늘 급식데이터 갱신');
    } else {
      console.error(err);
    }
  });

}

/*
* 급식 데이터 갱신
*/
exports.executeRestaurantCron = function(menuArray,todayMenu)
{
  var cron=require('node-cron');
  var dormRestaurantCron=require('../my_module/dormRestaurantCronService');

      cron.schedule('48 21 * * 0', function () {    //매주 월요일 03시 0분마다
      dormRestaurantCron.updateMenu(menuArray);
      console.log('['+commonFunction.getTime()+ ' 업데이트 완료] : 급식 데이터 갱신(1주단위)');

  },null,true,"Asia/Seoul").start();

    cron.schedule('12 22 * * *', function () {    //매일  23시 59분마다
    dormRestaurantCron.updateTodayMenu(menuArray,todayMenu);
    console.log('['+commonFunction.getTime()+ ' 업데이트 완료] : 오늘 급식 데이터 갱신(24시간단위)');
    },null,true,"Asia/Seoul").start();
}


/********************************************* 홈페이지 관련 ********************************************/
/********************************************* 홈페이지 관련 ********************************************/
/********************************************* 홈페이지 관련 ********************************************/


/*
* 홈페이지 데이터 read 초기화
*/

exports.initHomepageData=function(regular,study,encourage){
  var homepageReadModule=require('../my_module/homepageReadModule');
  homepageReadModule.updateHomepageData(regular,1);
  homepageReadModule.updateHomepageData(study,2);
  homepageReadModule.updateHomepageData(encourage,3);
  console.log('['+commonFunction.getTime()+ ' 초기화 완료] : 홈페이지 데이터 갱신');
}

/*
* 홈페이지 데이터 갱신
*/

exports.executeHomepageCron=function(regular,study,encourage){
  var cron=require('node-cron');
  var homepageReadModule=require('../my_module/homepageReadModule');

//    cron.schedule('00 09-18 * * *', function () {    //매일 9~18시 00분 마다
      cron.schedule('30 9,10,11,12,13,14,15,16,17,18 * * 1,2,3,4,5', function () {    //매일 9~18시 36분 마다

      homepageReadModule.updateHomepageData(regular,1);
      homepageReadModule.updateHomepageData(study,2);
      homepageReadModule.updateHomepageData(encourage,3);


      console.log('['+commonFunction.getTime()+ ' 업데이트 완료] : 홈페이지 데이터 갱신(1시간단위)');

    },null,true,"Asia/Seoul").start();

}
