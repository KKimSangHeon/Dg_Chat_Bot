let message = {};
/*
*  I_ 는 버튼 인스턴스를 의미함.
*  S_ 는 선택된 메뉴를 의미함.
*  M_ 는 메세지(단문)를 의미함.
*  L_ 는 관련된 메시지 모음집.
*/
var commonFunction = require('./commonFunction');

message.M_unknown_input='알수없는 입력입니다.\n'

message.S_go_to_init='초기화면으로';
message.I_go_to_init='99';  //초기화면으로 이동하는 입력
message.M_go_to_init='초기화면으로 돌아갑니다.';
message.M_please_select='버튼을 선택해 주세요';

message.I_init_buttons=['버스도착정보','도서관 좌석정보','기숙사 식단조회','통학버스 조회','홈페이지 조회']; //초기버튼



//BIS 관련

message.I_select_BIS=['1','2','3','4','초기화면으로'];
message.I_BusStopId_BIS=[
'352000537',   //1.동국대학교(금장1리)
'352000533',   //2.동국대학교(동국대병원)'
'352000539',   //3.성건주공아파트(동대교)
'352000531',   //4.성건주공아파트(성건파출소)'
// '352001290',   //5.시외버스터미널
// '352001345',   //5.시외버스터미널,고속버스터미널(고속버스터미널)
'초기화면으로'];
//old version
// 버스도착정보제공 확대에 따른 수정
//message.M_select_BIS='조회할 버스를 눌러주세요'

message.M_select_BIS='조회할 정류장의 숫자만 입력해주세요.\n정류장(이동방향)\n------------------------\n'+
'\n1.동국대학교(금장1리)'+
'\n2.동국대학교(동국대병원)'+
'\n3.성건주공아파트(동대교)'+
'\n4.성건주공아파트(성건파출소)'+
// '\n5.시외버스터미널(동대교)'+
// '\n6.시외버스터미널.고속버스터미널(고속버스터미널)'+

'\n\n99초기화면으로'
;
message.L_BIS=commonFunction.mergeString(
                                   message.I_init_buttons[0]
                                  ,message.I_select_BIS
                                      );



//홈페이지 관련


message.I_select_homepage_menu=['일반','학사','장학','초기화면으로'];
message.M_select_homepage_menu='조회할 메뉴를 눌러주세요';
message.M_go_to_hompage='홈페이지에서 보기';

message.regURL='http://web.dongguk.ac.kr/mbs/kr/jsp/board/list.jsp?boardId=105&id=kr_070102000000';
message.regRSS='http://web.dongguk.ac.kr/rssList.jsp?boardId=105&id=kr_070102000000';

message.studyURL='http://web.dongguk.ac.kr/mbs/kr/jsp/board/list.jsp?boardId=106&id=kr_070103000000';
message.studyRSS='http://web.dongguk.ac.kr/rssList.jsp?boardId=106&id=kr_070103000000';

message.encourageURL='http://web.dongguk.ac.kr/mbs/kr/jsp/board/list.jsp?boardId=146&id=kr_070109000000';
message.encourageRSS='http://web.dongguk.ac.kr/rssList.jsp?boardId=146&id=kr_070109000000';



message.L_homepage=commonFunction.mergeString(
                                        message.I_init_buttons[4]
                                       ,message.I_select_homepage_menu
                                           );



//도서관 좌석조회 관련

//message.I_select_library = [''];
message.libURL='http://203.247.250.5/domian5.asp'

message.L_library=commonFunction.mergeString(
                                              message.I_init_buttons[1]
                                          );





//기숙사 식단 관련

message.I_select_food_when=['아침','점심','저녁','야식','초기화면으로'];
message.M_select_food_when='조회할 식단을 눌러주세요'
message.M_no_food= '해당 식단이 존재하지 않습니다.';

message.L_food=commonFunction.mergeString(
                                        message.I_init_buttons[2]
                                       ,message.I_select_food_when
                                           );


message.I_select_bus_departure=['부산','양산','대구','울산','포항','초기화면으로'];
message.M_select_bus_departure='출발지 혹은 도착지를 선택해 주세요';
message.M_bus_departure_busan='■ 부산 등교\n서면(HSBC은행)(07:05, 08:30)\n→ 거제육교(07:15, 08:40)\n→ 한양프라자(07:20, 07:25, 08:45)\n→ 온천장1번출구(07:25, 07:30, 08:50)\n→ 금정구청맞은편(07:35, 07:40, 09:00)\n→ 양산간이정류장(07:45, 07:50, 09:10)\n→ 학교도착(08:50, 10:15)\n\n■ 부산 하교\n16 : 10(1대)\n양산간의정류장\n→ 금정구청\n→ 온천장\n→ 교대\n→ 거제리\n→ 서면\n\n17 : 10(1대)\n양산간의정류장\n→ 금정구청\n→ 온천장\n→ 교대\n→ 거제리\n→ 서면\n\n18 : 10(2대)\n양산간의정류장\n→ 금정구청\n→ 온천장\n→ 교대\n→ 거제리\n→ 서면';
message.M_bus_departure_yangsan='■ 양산 등교\n양산부산대병원(07:30)\n→ 양산역(07:35)\n→ 삼우맨션 앞(07:38)\n→ 양산우체국 앞 승강장(07:41)\n→ 네오파트버스승강장(07:43)\n→ 학교도착(08:50)\n\n■ 양산 하교\n학교출발(18:10)\n→ 네오파트버스승강장\n→ 양산우체국\n→ 삼우맨션\n→ 양산역\n→ 양산부산대병원';
message.M_bus_departure_daegu='■ 대구 등교\n성서홈플러스(맞은편)(06:40)\n→ 서부정류장(파로니아)(06:50)\n→ 적십자병원 앞(07:05)\n→ 궁전맨션(07:20)\n→ 동대구IC시외버스승강장(07:35)\n→ 학교도착(08:50)\n\n궁전맨션(07:18)\n→ (구)고속세차장(07:30)\n→ 보성아파트(07:33)\n→ 우방강촌마을(07:38)\n→ 동대구IC 시외버스승강장(07:40)\n→ 학교도착(08:50)\n\n■ 대구 하교\n학교출발(18:10)\n→ 동대구IC좌회전시외버스승강장 맞은편\n→ 우방강촌마을 맞은편\n→ 동부정류장\n→ 동대구고속버스터미널\n→ 그랜드호텔\n→ 동아쇼핑\n→ 서부정류장\n→'
                         +'성서홈플러스\n\n학교출발(17:10)\n→ 동대구IC좌회전시외버스승강장 맞은편\n→ 우방강촌마을 맞은편\n→ 동부정류장\n→ 동대구고속버스터미널\n→ 그랜드호텔';
message.M_bus_departure_ulsan='■ 울산 등교\n시외버스터미널(07:30)\n→ 신한은행중앙지점(07:32)\n→ 현대해상(07:33)\n→ 공업탑로터리(07:35)\n→ 옥동초등학교(07:37)\n→ 법원(07:39)\n→ 학교도착(08:50)\n\n학성공원(07:20)\n→ 옥교동승강장(07:23)\n→ 우정지하도(07:25)\n→ 동강병원(07:27)\n→ 제일중학교(07:30)\n→ 신복로터리(07:42)\n→ 학교도착(08:50)\n\n중구청(07:22)\n→ 장미아파트(07:25)\n→ 향교(07:27)\n→ 선경아파트(07:30)\n→ 강서병원(07:35)\n→ 신복로터리(07:42)\n→ 학교도착(08:50)\n\n'
+'꽃바위(06:45)\n→ 방어진종점(06:50)\n→ 일산해수욕장(06:53)\n→ 동울산우체국(06:57)\n→ 서부아파트(07:03)\n→ 남목시외버스(07:08)\n→ 성원쌍떼빌(07:12)\n→ 문화회관(07:15)\n→ 효문사거리(07:20)\n→ 화봉(07:25)\n→ 호계꽃단지(07:30)\n→ 신답사거리(07:32)\n→ 이화(07:40)\n→ 학교도착(08:50)\n\n'
+'■ 울산 하교\n(16:10) 신복\n→ 강서병원\n→ 제일중\n→ 선경아파트\n→ 향교\n→ 장미아파트\n→ 중구청\n→ 병영\n\n(17:10) 법원\n→ 군청\n→ 공업탑R\n→ 현대해상\n→ 시외터미널\n→ 삼산\n→ 학성공원\n→ 효문\n→ 화봉\n→ 호계\n→ 신답\n→ 이화\n\n'
+'(18:10) 신복R\n→ 옥현주공\n→ 법원\n→ 군청\n→ 공업탑R\n→ 현대해상\n→ 시외터미널\n\n'
+'(18:10) 이화\n→ 신답\n→ 호계\n→ 화봉\n→ 효문\n→ 문화회관\n→ 성원쌍떼빌\n→ 남목\n→ 서부아파트\n→ 현대백화점\n→ 동울산우체국\n→ 일산해수욕장\n→ 방어진삼거리\n→ 문현사거리';
message.M_bus_departure_pohang='■ 포항 등교\n포항우체국맞은편(09:10)\n→ SK뷰APT육교 아래 버스승강장(09:15)\n→ 유강육교(09:17)\n→ 학교도착(09:50)\n\n'
+'장량새마을금고(07:20)\n→ 창포우체국(07:25)\n→ 창포사거리(07:26)\n→ 나루끝한신APT(07:30)\n→ 용흥육교(07:35)\n→ 양학육교(07:40)\n→ 포항우체국맞은편(07:50)\n→ 유강육교(07:55)\n→ 학교도착(08:50)\n\n'
+'케이블방송국 맞은편승강장(07:20)\n→ 환호청소년수련관 입구(07:25)\n→ 해맞이공원앞 버스승강장(07:27)\n→ 항구우체국(07:30)\n→ 포은도서관 버스승강장(07:33)\n→ 오거리홈플 건너편 버스승강장(07:38)\n→ 웨딩캐슬 건너편 버스승강장(07:41)\n→ 오광장온누리약국 앞(07:45)\n→ 시외터미널 우체국 맞은편(07:50)\n→ SK뷰APT 육교 아래 버스승강장(07:55)\n→ 학교도착(08:50)\n\n'
+'(구)포항역(모던하우스 포항점)(09:10)\n→ 시외터미널 우체국 맞은편(09:15)\n→ 학교도착(09:50)\n\n'
+'■ 포항 하교\n(16:10)SK뷰아파트\n→ 포항시외버스터미널\n→ 오광장온누리약국건너편\n→ 웨딩케슬\n→ 오거리홈플러스\n→ 포은도서관\n→ 항구우체국\n→ 해맞이공원\n→ 청소년수련관\n→ 케이블방송국\n\n'
+'(17:10)유강육교\n→ SK뷰 아파트\n→ 시외버스터미널\n→ 양학육교\n→ 용흥육교\n→ 한신아파트\n→ 창포사거리\n→ 창포우체국\n→ 장량새마을금고\n\n'
+'(18:10)유강육교\n→ 포항시외버스터미널\n→ 양학육교\n→ 용흥육교\n→ 한신아파트\n→ 창포사거리\n→ 창포우체국\n→ 장량새마을금고\n\n'
+'(18:10)SK뷰아파트\n→ 포항시외버스터미널\n→ 오광장온누리약국건너편\n→ 웨딩케슬\n→ 오거리홈플러스\n→ 포은도서관\n→ 항구우체국\n→ 해맞이공원\n→ 청소년수련관\n→ 케이블방송국\n\n'

message.L_bus=commonFunction.mergeString(
                                   message.I_init_buttons[3]
                                  ,message.I_select_bus_departure
                                      );



module.exports = message;
