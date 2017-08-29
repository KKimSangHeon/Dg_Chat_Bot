exports.processMessage = function (res,v_content,commonMessage,commonFunction,BISReadModule,async,request){
  if(v_content===commonMessage.I_init_buttons[0])
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_select_BIS,commonMessage.I_select_BIS);
   }
   else if(v_content===commonMessage.I_select_BIS[0]) //금장1리방향
   {
     BISReadModule.wayToGJ1ri(res,v_content,commonMessage,commonFunction,async,request);
   }
   else if(v_content===commonMessage.I_select_BIS[1]) //동국대병원방향
   {
     BISReadModule.wayToHospital(res,v_content,commonMessage,commonFunction,async,request);
   }
   else  //알수없는 입력
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_select_BIS);
   }
}
