
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
exports.parsingFood = function(data,data_type) {
  var param=arguments;
  var res_data;
  var temp;



  switch(data_type){
    case 6:   case 16:   case 25:   case 34:   case 43:   case 52:   case 61:
      res_data = data.replace(/(\s*)/g, "");  //데이터가 요일일 경우
      break;
    default :
      res_data = data.replace( /(\s*)/g, "#").replace(/##/g,"\n").replace(/#/g,"")
      break;
  }

  switch(data_type){
    case 7:   case 8:   case 9:   case 17:   case 18:   case 19:
    case 26:  case 27:  case 28:  case 35:   case 36:   case 37:
    case 44:  case 45:  case 46:  case 53:   case 54:   case 55:
    case 62:  case 63:  case 64:
      res_data = res_data.replace(/\n/g,"")
      break;
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
exports.processCreateObject = function($,day,e_breakfast,e_lunch,e_dinner,extra1,breakfast,lunch,dinner,extra2) {
    var tempObj=new Object();

    tempObj.day =  exports.parsingFood(($('td').eq(day).text()),day);

    var temp_extra = exports.parsingFood(($('td').eq(e_breakfast).text()),e_breakfast);
    if(temp_extra.length>=2)
    {
      tempObj.breakfast = temp_extra + '\n' + exports.parsingFood(($('td').eq(breakfast).text()),breakfast) ;
    }
    else
      tempObj.breakfast = exports.parsingFood(($('td').eq(breakfast).text()),breakfast) ;

    temp_extra = exports.parsingFood(($('td').eq(e_lunch).text()),e_lunch);
    if(temp_extra.length>=2)
    {
      tempObj.lunch = temp_extra + '\n' + exports.parsingFood(($('td').eq(lunch).text()),lunch) ;
    }
    else
      tempObj.lunch =  exports.parsingFood(($('td').eq(lunch).text()),lunch) ;

    temp_extra = exports.parsingFood(($('td').eq(e_dinner).text()),e_dinner);
    if(temp_extra.length>=2)
    {
    tempObj.dinner = temp_extra + '\n' + exports.parsingFood(($('td').eq(dinner).text()),dinner) ;
    }
    else
      tempObj.dinner = exports.parsingFood(($('td').eq(dinner).text()),dinner) ;


    temp_extra = exports.parsingFood(($('td').eq(extra1).text()),extra1);
    if(temp_extra.length>=2)
    {
      tempObj.extra =  temp_extra + '\n' + exports.parsingFood(($('td').eq(extra2).text()),extra2) ;
    }
    else
      tempObj.extra =  exports.parsingFood(($('td').eq(extra2).text()),extra2) ;




      tempObj.breakfast = exports.removeEnter(tempObj.breakfast);
      tempObj.lunch = exports.removeEnter(tempObj.lunch);
      tempObj.dinner = exports.removeEnter(tempObj.dinner);

      tempObj.extra =exports.processExtraFood(tempObj.extra);

    return tempObj;
}

exports.processFoodData = function($,menuArray){
  //  console.log(menuArray[1].day);

    menuArray.push(exports.processCreateObject($,6,7,8,9,10,12,13,14,15));
    menuArray.push(exports.processCreateObject($,16,17,18,19,20,21,22,23,24));
    menuArray.push(exports.processCreateObject($,25,26,27,28,29,30,31,32,33));
    menuArray.push(exports.processCreateObject($,34,35,36,37,38,39,40,41,42));
    menuArray.push(exports.processCreateObject($,43,44,45,46,47,48,49,50,51));
    menuArray.push(exports.processCreateObject($,52,53,54,55,56,57,58,59,60));
    menuArray.push(exports.processCreateObject($,61,62,63,64,65,66,67,68,69));
}
