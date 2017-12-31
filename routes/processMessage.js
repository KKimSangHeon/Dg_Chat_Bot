module.exports=function(){

  var route = require('express').Router();

  //var connection = require('../config/mysql/connection');


  var commonMessage = require('../common/commonMessage');
  var commonFunction = require('../common/commonFunction');

  var processHomepage = require('../my_module/processHomepage')
  var processBus = require('../my_module/processBus')
  var processDormRestaurant = require('../my_module/processDormRestaurant')
  var homepageReadModule = require('../my_module/homepageReadModule');

  var libraryReadModule = require('../my_module/libraryReadModule');
  var processLibrary = require('../my_module/processLibrary');

  var BISReadModule = require('../my_module/BISReadModule');
  var processBIS = require('../my_module/processBIS');


  var myCron = require('../my_module/myCron');

  var menuArray = new Array();
  var todayMenu = new Object();
  var r_homepageArray=new Array();   //일반
  var s_homepageArray=new Array();   //학사
  var e_homepageArray=new Array();   //장학
  var statistics=new Array(); //어느 버튼이 많이 눌렸나 확인하기 위해
  statistics[0]=0;  //BIS
  statistics[1]=0;  //도서관버튼
  statistics[2]=0;  //기숙사
  statistics[3]=0;  //통학버스
  statistics[4]=0;  //홈페이지
  var access=0;

  var async = require('async');
  var request = require('request');
  var cheerio = require('cheerio');
  var iconv = require('iconv-lite');


  myCron.initDormRestaurantData(menuArray,todayMenu);   //급식정보 초기화
  myCron.executeRestaurantCron(menuArray,todayMenu);    //급식정보 주기적 업데이트

  myCron.initHomepageData(r_homepageArray,s_homepageArray,e_homepageArray); //홈페이지 정보 초기화
  myCron.executeHomepageCron(r_homepageArray,s_homepageArray,e_homepageArray);  //홈페이지 정보 주기적 업데이트


  route.post('/',function(req,res){
    access++;
    if(access%100 == 0){

        console.log("==========\nBIS : "+ statistics[0]+"\n"+
                    "도서관버튼 : "+ statistics[1]+"\n"+
                    "기숙사 : "+ statistics[2]+"\n"+
                    "통학버스 : "+ statistics[3]+"\n"+
                    "홈페이지 : "+ statistics[4]+"\n=========="
      );
    }

    var v_type = req.body.type;
    var v_user_key = req.body.user_key;
    var v_content = req.body.content;

    if(v_content===commonMessage.S_go_to_init || v_content==commonMessage.I_go_to_init )  //초기화면
    {
        commonFunction.sendMessageWithButton(res,commonMessage.M_please_select,commonMessage.I_init_buttons);
    }
    else if(-1<commonMessage.L_BIS.indexOf(v_content)) //BIS관련버튼 누름
    {
      statistics[0]++;
      processBIS.processMessage(res,v_content,commonMessage,commonFunction,BISReadModule,async,request);
    }

    else if(-1<commonMessage.L_library.indexOf(v_content))  //도서관버튼 누름
    {
       statistics[1]++;
        processLibrary.processMessage(res,v_content,commonMessage,commonFunction,libraryReadModule,async,request,cheerio,iconv);
    }
    else if(-1<commonMessage.L_food.indexOf(v_content)) //기숙사 식당 관련버튼 누름
    {
      statistics[2]++;
        processDormRestaurant.processMessage(res,v_content,commonMessage,commonFunction,todayMenu);
    }
    else if(-1<commonMessage.L_bus.indexOf(v_content))  //버스관련버튼 누름
    {
      statistics[3]++;
        processBus.processMessage(res,v_content,commonMessage,commonFunction);
    }

    else if(-1<commonMessage.L_homepage.indexOf(v_content))   //홈페이지 관련버튼 누름
   {
       statistics[4]++;
        processHomepage.processMessage(res,v_content,commonMessage,commonFunction,r_homepageArray,s_homepageArray,e_homepageArray);
   }
    else  //알 수 없는 입력
    {
        commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_init_buttons);
    }
  });
  return route;
}
