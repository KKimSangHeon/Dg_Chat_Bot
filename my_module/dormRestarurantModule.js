
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
* 급식 문자 파싱(공백 줄바꿈등.)
* 매개변수를 한 개 넘기면 메뉴로 판단.
* 매개변수를 두 개 넘기면 요일로 판단.
*/
exports.parsingFood = function(data,data_type,checker) {
  var param=arguments;
  var res_data;
  var temp;

  if(checker == 0 ){
    switch(data_type){
      case 6:   case 16:   case 25:   case 34:   case 43:   case 52:   case 61:
        res_data = data.replace(/(\s*)/g, "");  //데이터가 요일일 경우
        break;
      default :
        res_data = data.replace( /(\s*)/g, "#").replace(/##/g,"\n").replace(/#/g,"")
        break;
    }
     //부식일경우
    switch(data_type){
      case 7:   case 8:   case 9:   case 17:   case 18:   case 19:
      case 26:  case 27:  case 28:  case 35:   case 36:   case 37:
      case 44:  case 45:  case 46:  case 53:   case 54:   case 55:
      case 62:  case 63:  case 64:
        res_data = res_data.replace(/\n/g,"")
        break;
    }
  }else{
    //페이지 테이블 변경으로 수정 2017-08-23
    switch(data_type){
      case 6+1:   case 16+1:   case 25+1:   case 34+1:   case 43+1:   case 52+1:   case 61+1:
        res_data = data.replace(/(\s*)/g, "");  //데이터가 요일일 경우
        break;
      default :
        res_data = data.replace( /(\s*)/g, "#").replace(/##/g,"\n").replace(/#/g,"")
        break;
    }
    //부식일경우
    switch(data_type){
      case 7+1:   case 8+1:   case 9+1:   case 17+1:   case 18+1:   case 19+1:
      case 26+1:  case 27+1:  case 28+1:  case 35+1:   case 36+1:   case 37+1:
      case 44+1:  case 45+1:  case 46+1:  case 53+1:   case 54+1:   case 55+1:
      case 62+1:  case 63+1:  case 64+1:
        res_data = res_data.replace(/\n/g,"")
        break;
    }

  }

  return res_data;

}
/*
* 마지막,처음에 개행이 들어가는 문제가 있어서 생성한 함수.
* 마지막,처음에 개행이 있으면 제거한다.
*/
exports.removeEnter = function(data) {
  var commonMessage = require('../common/commonMessage');
  var res_data = data;


  if(data.charAt(0)=='\n' || data.charAt(0)==' ')
  {
        res_data = res_data.slice(1);
  }
  if(data.charAt(data.length-1)=='\n' || data.charAt(data.length-1)==' ')
  {
      res_data = res_data.slice(0,-1);
  }

  if(res_data.length === 0 )
    res_data=commonMessage.M_no_food;
  return res_data;

}

exports.processExtraFood = function(data){
  var commonMessage = require('../common/commonMessage');
  var res_data = data;

  if(res_data.length<3 )
      res_data=commonMessage.M_no_food;

  return res_data;
}


/*
* 급식 정보를 object로 반환한다.
* 로직 : 부식이 존재하면 부식이랑 메뉴랑 잇고, 부식이 없으면 메뉴만 저장.
*/
exports.processCreateObject = function($,day,e_breakfast,e_lunch,e_dinner,extra1,breakfast,lunch,dinner,extra2,checker) {
    var tempObj=new Object();

    tempObj.day =  exports.parsingFood(($('td').eq(day).text()),day,checker);

    var temp_extra = exports.parsingFood(($('td').eq(e_breakfast).text()),e_breakfast,checker);
    if(temp_extra.length>=2)
    {
      tempObj.breakfast = temp_extra + '\n' + exports.parsingFood(($('td').eq(breakfast).text()),breakfast,checker) ;
    }
    else
      tempObj.breakfast = exports.parsingFood(($('td').eq(breakfast).text()),breakfast,checker) ;

    temp_extra = exports.parsingFood(($('td').eq(e_lunch).text()),e_lunch,checker);
    if(temp_extra.length>=2)
    {
      tempObj.lunch = temp_extra + '\n' + exports.parsingFood(($('td').eq(lunch).text()),lunch,checker) ;
    }
    else
      tempObj.lunch =  exports.parsingFood(($('td').eq(lunch).text()),lunch,checker) ;

    temp_extra = exports.parsingFood(($('td').eq(e_dinner).text()),e_dinner,checker);
    if(temp_extra.length>=2)
    {
    tempObj.dinner = temp_extra + '\n' + exports.parsingFood(($('td').eq(dinner).text()),dinner,checker) ;
    }
    else
      tempObj.dinner = exports.parsingFood(($('td').eq(dinner).text()),dinner,checker) ;


    temp_extra = exports.parsingFood(($('td').eq(extra1).text()),extra1,checker);
    if(temp_extra.length>=2)
    {
      tempObj.extra =  temp_extra + '\n' + exports.parsingFood(($('td').eq(extra2).text()),extra2,checker) ;
    }
    else
      tempObj.extra =  exports.parsingFood(($('td').eq(extra2).text()),extra2,checker) ;

      tempObj.breakfast = exports.removeEnter(tempObj.breakfast);
      tempObj.lunch = exports.removeEnter(tempObj.lunch);
      tempObj.dinner = exports.removeEnter(tempObj.dinner);

      tempObj.extra =exports.processExtraFood(tempObj.extra);

    return tempObj;
}

exports.processFoodData = function($,menuArray){
// 테이블이 변경되었을때 아래의 코드(주석2줄)와 비교해서 찾으면 쉽다.
  //  for(var i=0;i<100;i++)
  //   console.log(i+"번"+$('td').eq(i).text());

      var checker;  //테이블 태그가 두개의 경우의 수가 존재하여 추가.. 2017-08-25

    //페이지 테이블 변경으로 수정 2017-08-23
     if($('td').eq(6).text().length < 6)
     {
       checker = 1;
       menuArray.push(exports.processCreateObject($,6+1,7+1,8+1,9+1,10+1,12+1,13+1,14+1,15+1,checker));
       menuArray.push(exports.processCreateObject($,16+1,17+1,18+1,19+1,20+1,21+1,22+1,23+1,24+1,checker));
       menuArray.push(exports.processCreateObject($,25+1,26+1,27+1,28+1,29+1,30+1,31+1,32+1,33+1,checker));
       menuArray.push(exports.processCreateObject($,34+1,35+1,36+1,37+1,38+1,39+1,40+1,41+1,42+1,checker));
       menuArray.push(exports.processCreateObject($,43+1,44+1,45+1,46+1,47+1,48+1,49+1,50+1,51+1,checker));
       menuArray.push(exports.processCreateObject($,52+1,53+1,54+1,55+1,56+1,57+1,58+1,59+1,60+1,checker));
       menuArray.push(exports.processCreateObject($,61+1,62+1,63+1,64+1,65+1,66+1,67+1,68+1,69+1,checker));

     } else{
       checker = 0;
       //day,e_breakfast,e_lunch,e_dinner,extra1,breakfast,lunch,dinner,extra2 순서
       menuArray.push(exports.processCreateObject($,6,7,8,9,10,12,13,14,15,checker));
       menuArray.push(exports.processCreateObject($,16,17,18,19,20,21,22,23,24,checker));
       menuArray.push(exports.processCreateObject($,25,26,27,28,29,30,31,32,33,checker));
       menuArray.push(exports.processCreateObject($,34,35,36,37,38,39,40,41,42,checker));
       menuArray.push(exports.processCreateObject($,43,44,45,46,47,48,49,50,51,checker));
       menuArray.push(exports.processCreateObject($,52,53,54,55,56,57,58,59,60,checker));
       menuArray.push(exports.processCreateObject($,61,62,63,64,65,66,67,68,69,checker));
     }

    // day,e_breakfast,e_lunch,e_dinner,extra1,breakfast,lunch,dinner,extra2 순서
    // menuArray.push(exports.processCreateObject($,6,7,8,9,10,12,13,14,15));
    // menuArray.push(exports.processCreateObject($,16,17,18,19,20,21,22,23,24));
    // menuArray.push(exports.processCreateObject($,25,26,27,28,29,30,31,32,33));
    // menuArray.push(exports.processCreateObject($,34,35,36,37,38,39,40,41,42));
    // menuArray.push(exports.processCreateObject($,43,44,45,46,47,48,49,50,51));
    // menuArray.push(exports.processCreateObject($,52,53,54,55,56,57,58,59,60));
    // menuArray.push(exports.processCreateObject($,61,62,63,64,65,66,67,68,69));


//페이지 테이블 변경으로 수정 2017-08-23
    // menuArray.push(exports.processCreateObject($,6+1,7+1,8+1,9+1,10+1,12+1,13+1,14+1,15+1));
    // menuArray.push(exports.processCreateObject($,16+1,17+1,18+1,19+1,20+1,21+1,22+1,23+1,24+1));
    // menuArray.push(exports.processCreateObject($,25+1,26+1,27+1,28+1,29+1,30+1,31+1,32+1,33+1));
    // menuArray.push(exports.processCreateObject($,34+1,35+1,36+1,37+1,38+1,39+1,40+1,41+1,42+1));
    // menuArray.push(exports.processCreateObject($,43+1,44+1,45+1,46+1,47+1,48+1,49+1,50+1,51+1));
    // menuArray.push(exports.processCreateObject($,52+1,53+1,54+1,55+1,56+1,57+1,58+1,59+1,60+1));
    // menuArray.push(exports.processCreateObject($,61+1,62+1,63+1,64+1,65+1,66+1,67+1,68+1,69+1));

}
