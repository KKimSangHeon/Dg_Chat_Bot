exports.processMessage = function (res,v_content,commonMessage,commonFunction,libraryReadModule,async,request,cheerio,iconv){

  if(v_content===commonMessage.I_init_buttons[1])  //도서관 좌석조회
  {
    libraryReadModule.readLibraryRemain(res,v_content,commonMessage,commonFunction,async,request,cheerio,iconv);

  }
  else   //알수없는 입력
  {
    commonFunction.sendMessageWithButton(res,commonMessage.M_unknown_input+commonMessage.M_please_select,commonMessage.I_init_buttons);

  }
}
