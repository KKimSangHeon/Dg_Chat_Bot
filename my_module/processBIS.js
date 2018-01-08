exports.processMessage = function (res,v_content,commonMessage,commonFunction,BISReadModule,async,request){
  var index;
  if(v_content===commonMessage.I_init_buttons[0])
   {
     // commonFunction.sendMessageWithButton(res,commonMessage.M_select_BIS,commonMessage.I_select_BIS);

// 2017-12-31 수정
// 버스 도착정보 제공기능 확대를 위한 수정
// 버튼방식에서 입력하는 방식으로 변경

     commonFunction.sendMessage(res,commonMessage.M_select_BIS);

   }
   else if(v_content==='c')
   {
     BISReadModule.processCoin(res,commonFunction,request,async);

   }
   else if((index = commonMessage.I_select_BIS.indexOf(v_content)) != -1)
   {
     // indexOf를 이용해 if문을 줄임.
       BISReadModule.processByBusStopId(res,v_content,commonMessage,commonFunction,async,request,commonMessage.I_BusStopId_BIS[index]);
   }
   else  //알수없는 입력
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_init_buttons);
   }
}
