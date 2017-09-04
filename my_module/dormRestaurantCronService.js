
exports.updateMenu=function(menuArray){
  const async = require('async');
  const request = require('request');
  const cheerio = require('cheerio');
  var iconv = require('iconv-lite');
  var dormRestaurantModule = require('../my_module/dormRestarurantModule');
  var menu1;
  var menu2;
  var menu3;

const URL ={
    list_page: 'https://dorm.dongguk.ac.kr/wiz/contents/board/board.php?home_id=living&handle=6/'

};

const tasks = [
/* 1번함수
*  list_page에 접속하여 글의 번호을 알아온다.
*/

      function(callback){
        request.get(URL.list_page, function(err, res, html){
          if (!err && res.statusCode === 200) {
            let $ = cheerio.load(html);
            let data_num =[];

            //수정사항: data_num[1]   eq(1)로 변경할것
              data_num[0] = $('.titletable').find("a").eq(0).attr("href").substring(20,24);
              data_num[1] = $('.titletable').find("a").eq(1).attr("href").substring(20,24);

              if( $('.titletable').find("a").eq(2).attr("href")==null){
                menu3 = 0;

              }else {
                data_num[2] = $('.titletable').find("a").eq(2).attr("href").substring(20,24);
              }

            callback(err,data_num);
          }
        });
      },

/*
* 2번함수
* 메뉴 사이트에 접근해서 데이터를 읽어와 menuArray에 push한다.
*/

      function(data_num, callback) {
        list_menu1='https://dorm.dongguk.ac.kr/wiz/contents/board/board0/board_view.php?board_id=6%2F&handle=6%2F&home_id=living&board_seq='
        list_menu2='&searchColumn=&searchText=&page=1'
        menu1=list_menu1+data_num[0]+list_menu2;
        menu2=list_menu1+data_num[1]+list_menu2;

        if(menu3 != 0 ){
          menu3 = list_menu1+data_num[2]+list_menu2;

        }


        if(menuArray.length===14)
            menuArray.length=0;

        // 첫 번째 게시글에 한해 데이터 전송
        var options = {
          method: "GET",
            uri: menu1,
            headers: { "User-Agent": "Mozilla/5.0" },
            encoding: null
        };

        request.get(options, function(err, res, html){
          if (!err && res.statusCode === 200) {
            var $ = cheerio.load(iconv.decode(new Buffer(html), 'euc-kr').toString(), {decodeEntities: false});
            const $table =   $('td').eq(11);
            var table_data = $table.text();
            $ = cheerio.load(table_data);

            dormRestaurantModule.processFoodData($,menuArray)
            callback(err,menuArray);
          }
        });
      },
/*
* 3번함수
* 메뉴 사이트에 접근해서 데이터를 읽어와 menuArray에 push한다.
*/
    function(menuArray, callback) {
      // 두 번째 게시글에 한해 데이터 전송
      var options = {
        method: "GET",
          uri: menu2,
          headers: { "User-Agent": "Mozilla/5.0" },
          encoding: null
      };

      request.get(options, function(err, res, html){
        if (!err && res.statusCode === 200) {
          var $ = cheerio.load(iconv.decode(new Buffer(html), 'euc-kr').toString(), {decodeEntities: false});
          const $table =   $('td').eq(11);
          var table_data = $table.text();
          $ = cheerio.load(table_data);

          dormRestaurantModule.processFoodData($,menuArray)
          callback(err,menuArray);
        }
      });
    },
    /*
    * 4번함수
    * 메뉴 사이트에 접근해서 데이터를 읽어와 menuArray에 push한다.
    */
        function(menuArray, callback) {
          // 두 번째 게시글에 한해 데이터 전송

          if(menu3 != 0){
          var options = {
            method: "GET",
              uri: menu3,
              headers: { "User-Agent": "Mozilla/5.0" },
              encoding: null
          };

          request.get(options, function(err, res, html){
            if (!err && res.statusCode === 200) {
              var $ = cheerio.load(iconv.decode(new Buffer(html), 'euc-kr').toString(), {decodeEntities: false});
              const $table =   $('td').eq(11);
              var table_data = $table.text();
              $ = cheerio.load(table_data);

              dormRestaurantModule.processFoodData($,menuArray)
              callback(err,menuArray);
            }
          });
        }else{
          callback(null,menuArray);
        }
        },
/*
* 5번함수
* DB에 접근해 데이터 갱신
*/
    function(menuArray, callback) {
      for(var i=0;i<menuArray.length;i++)
        console.log(menuArray[i].day);

    callback(null);
  }

    ];
    async.waterfall(tasks, function(err){
      if (!err) {
        //console.info('Menu Updated');
      } else {
        console.error(err);
      }
    });
}


exports.updateTodayMenu=function(menuArray,todayMenu){
    var commonMessage = require('../common/commonMessage');
    var date_data;
    var date= new Date();

    var increase ;

    if(date.getHours()>=21){
    increase = 1;
    }else{
    increase = 0;
    }

    date.setDate(date.getDate()+increase);



     var day=new Array('일','월','화','수','목','금','토');
     var day_num=date.getDay();
     var month=date.getMonth()+1;
     var date=date.getDate();

    date_data=day[day_num]+'('+month+'월'+date+'일)'




    for(var i=0;i<menuArray.length;i++)
    {
        if(menuArray[i].day == date_data)
        {
          todayMenu.breakfast=menuArray[i].breakfast;
          todayMenu.lunch=menuArray[i].lunch;

          todayMenu.dinner=menuArray[i].dinner;
          todayMenu.extra=menuArray[i].extra;
          return;
        }
    }

    todayMenu.breakfast = commonMessage.M_no_food
    todayMenu.lunch = commonMessage.M_no_food
    todayMenu.dinner = commonMessage.M_no_food
    todayMenu.extra = commonMessage.M_no_food

}
