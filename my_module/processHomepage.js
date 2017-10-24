exports.processMessage = function (res,v_content,commonMessage,commonFunction,r_homepageArray,s_homepageArray,e_homepageArray){
  var message;


  if(v_content===commonMessage.I_init_buttons[4]) //홈페이지 조회
  {
   //홈페이지 조회
   commonFunction.sendMessageWithButton(res,commonMessage.M_select_homepage_menu,commonMessage.I_select_homepage_menu);
  }
  else if(v_content===commonMessage.I_select_homepage_menu[0])    //일반
  {
   message= exports.makeMessage(r_homepageArray)
   commonFunction.sendMessageWithButtonAndLabel(res,message,commonMessage.I_select_homepage_menu,commonMessage.M_go_to_hompage,commonMessage.regURL);
  }
  else if(v_content===commonMessage.I_select_homepage_menu[1])    //학사
  {
    message=exports.makeMessage(s_homepageArray)
    commonFunction.sendMessageWithButtonAndLabel(res,message,commonMessage.I_select_homepage_menu,commonMessage.M_go_to_hompage,commonMessage.studyURL);
  }
  else if(v_content===commonMessage.I_select_homepage_menu[2])    //장학
  {
    message=exports.makeMessage(e_homepageArray)
    commonFunction.sendMessageWithButtonAndLabel(res,message,commonMessage.I_select_homepage_menu,commonMessage.M_go_to_hompage,commonMessage.encourageURL);
  }
  else
  {
    commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_select_homepage_menu);
  }

}

/*
* 메세지 만드는 함수
*/


exports.makeMessage= function(array)
{
  var message='';
    for(var i=0;i<array.length;i++)
    {
        message+=array[i].data;
    }

  return message;
}
