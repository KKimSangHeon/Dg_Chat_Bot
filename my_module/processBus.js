exports.processMessage = function (res,v_content,commonMessage,commonFunction){

  if(v_content===commonMessage.I_init_buttons[3])
   {
     //통학버스 조회
     commonFunction.sendMessageWithButton(res,commonMessage.M_select_bus_departure,commonMessage.I_select_bus_departure);
   }
   else if(v_content===commonMessage.I_select_bus_departure[0]) //부산일경우
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_bus_departure_busan,commonMessage.I_select_bus_departure);
   }
   else if(v_content===commonMessage.I_select_bus_departure[1]) //양산일경우
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_bus_departure_yangsan,commonMessage.I_select_bus_departure);
   }
   else if(v_content===commonMessage.I_select_bus_departure[2]) //대구일경우
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_bus_departure_daegu,commonMessage.I_select_bus_departure);
   }
   else if(v_content===commonMessage.I_select_bus_departure[3]) //울산일경우
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_bus_departure_ulsan,commonMessage.I_select_bus_departure);
   }
   else if(v_content===commonMessage.I_select_bus_departure[4]) //포항일경우
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_bus_departure_pohang,commonMessage.I_select_bus_departure);
   }
   else  //알수없는 입력
   {
     commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_select_bus_departure);
   }
}
