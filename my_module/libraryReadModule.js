
exports.readLibraryRemain=function(res,v_content,commonMessage,commonFunction,async,request,cheerio,iconv){


const URL ={
    list_page: 'http://203.247.250.5/domian5.asp'

};

const tasks = [
/* 1번함수
*  현황을 읽어온다.
*/

      function(callback){
        // 페이지에 접근해서 정보 읽어오기
        var options = {
          method: "GET",
            uri: commonMessage.libURL,
            headers: { "User-Agent": "Mozilla/5.0" },
            encoding: null
        };

        request.get(options, function(err, res, html){
          if (!err && res.statusCode === 200) {
            var $ = cheerio.load(iconv.decode(html, 'euc-kr').toString(), {decodeEntities: false});
            var res_data='';

            for(var i=0;i<10;i++)
            {
            var data =   $('tr').eq(i+3).text().replace(/ /gi, "");
            data=data.split(/\u00A0/g);

            res_data += '■ '+data[1] + '\n→ 전체좌석:'+data[2]+' / 잔여석:' + data[4] + '\n';
            if(i<9)
              res_data+= '\n';
            }
            callback(err,res_data);

          }
        });
      },


      function(res_data, callback) {
        commonFunction.sendMessageWithButtonAndLabel(res,res_data,commonMessage.I_init_buttons,commonMessage.M_go_to_hompage,commonMessage.libURL);
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
