exports.processMessage = function (res,v_content,commonMessage,commonFunction,todayMenu){

  if(v_content===commonMessage.I_init_buttons[2])  //기숙사식단조회
  {
    //기숙사 식단조회
    commonFunction.sendMessageWithButton(res,commonMessage.M_select_food_when,commonMessage.I_select_food_when);
  }
  else if(v_content===commonMessage.I_select_food_when[0])  //아침
  {
    //아침조횜
    commonFunction.sendMessageWithButton(res,todayMenu.breakfast,commonMessage.I_select_food_when);

  }
  else if(v_content===commonMessage.I_select_food_when[1])  //점심
  {
    commonFunction.sendMessageWithButton(res,todayMenu.lunch,commonMessage.I_select_food_when);


  }
  else if(v_content===commonMessage.I_select_food_when[2])  //저녁
  {
    commonFunction.sendMessageWithButton(res,todayMenu.dinner,commonMessage.I_select_food_when);
  }
  else if(v_content===commonMessage.I_select_food_when[3])  //야식
  {
    commonFunction.sendMessageWithButton(res,todayMenu.extra,commonMessage.I_select_food_when);
  }
  else   //알수없는 입력
  {
    commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_select_food_when);

  }

}
