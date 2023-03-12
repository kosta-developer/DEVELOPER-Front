$(() => {
    hostCheckIntervalLogined()
    
    let url = backURL + "studyroom/roominfo/reservation/";
    http: console.log(decodeURI(location.href));
   var postURL = decodeURI(location.href);
   var postURL2 = postURL.split("=");
  
   var postURL3 = postURL2[1].split("&");
    var roomSeq = postURL3[0];
   var postURL4=postURL2[2].split("&");
   var openTime=  postURL4[0];
   var closeTime=postURL2[3]
   console.log("roomSeq: " + roomSeq+ "openTime: "+openTime+ "closeTime: "+closeTime);
   
   var value = {};
   var firstValue = "원본";
   var secondValue = "원본";
 
   //--오늘 이전 날짜 선택 금지 기능START--
   var date = new Date();
   var year = date.getFullYear();
   var month = ("0" + (date.getMonth() + 1)).slice(-2);
   var day = ("0" + date.getDate()).slice(-2);
   var sysdate = year + "-" + month + "-" + day;
   console.log("오늘날짜는 " + sysdate);
   $("#input-date").attr("min", sysdate);
 
   //--오늘 이전 날짜 선택 금지 기능END--
 
   //--체크박스 초기화 START--
   var date_input = "";
   $("#input-date").change(function () {
     for (i = 1; i <= 24; i++) {
       //체크박스 초기화
       $("#" + i).prop("checked", false);
       $("#" + i).prop("disabled", false);
     }
     date_input = $("#input-date").val();
     // $('#box1').prop('checked', true);
     // $('#box1').prop("disabled", true);
     console.log("선택한 날짜는 " + date_input);
     var param = {
       usingDate: date_input,
     };
 
     //--체크박스 초기화 END--
 
     //--예약가능한 리스트 출력 ajax --START
     $.ajax({
       xhrFields: {
         withCredentials: true,
       },
       url: url + roomSeq,
       method: "GET",
       data: param,
       success: function (jsonObj) {
         let ct = closeTime;
         let CT = ct.split(":");
         console.log("CT값은" + CT);
 
         let ot = openTime;
         var CTNUM = Number(CT[0]);
 
         let OT = ot.split(":");
         var OTNUM = Number(OT[0]);
         console.log("ctnum: " + CTNUM + " otnum: " + OTNUM);
 
         //--영업종료시간 이후 체크 금지 START--
         for (i = CTNUM; i <= 24; i++) {
           //$("#box" + i).prop("checked", true);
           $("#" + i).prop("disabled", true);
         }
 
         //--영업종료시간 이후 체크 금지 END--
 
         //--영업시작시간 이전 체크 금지 START--
         for (i = OTNUM; i > 0; i--) {
           // $("#box" + i).prop("checked", true);
           $("#" + i).prop("disabled", true);
         }
         //--영업시작시간 이전 체크 금지 END--
 
         //--예약가능한 리스트 데이터 출력 --START
         $(jsonObj).each((index, p) => {
           console.log("d" + p);
           try {
             if (p.startTime === undefined) {
             }
             let startTime = p.startTime;
 
             if (p.endTime === undefined) {
             }
             let endTime = p.endTime;
 
             console.log("startTime" + startTime);
 
             let st = startTime.split(":");
             let ST = Number(st[0]);
             let et = endTime.split(":");
             let ET = Number(et[0]);
 
             for (i = ST; i <= ET; i++) {
               //이미 예약된 시간 체크 금지
 
               $("#" + i).prop("disabled", true);
             }
           } catch (error) {
             console.log(error.message);
           } finally {
           }
         });
         //--예약가능한 리스트 데이터 출력 --END
       },
       error: function (xhr) {},
     });
   });
   //변수 두개를 만듬
   //체크 안된거 화이트
   //체크 된거 블루
   // 체크 하고 블루 값이
   // 클릭 관련 이벤트는 하나만.
   // 클릭을 하고 배열의 길이를 확인 배열의 길이가 1(2개)을 초과하면 alert 및 마지막 체크 체크해제
   // 배열의 값이 두개인 상태에서 값이 작은 것이 시작시간 큰것임
 
   //배열의 값이 1개인 상태이면 값 +1 이 종료시간
 
   // 체크가 1개일때에는 시작시간은 해당 value 값 그대로 입력, 종료시간은 value +1
   // 체크가 2개 일때에는 먼저 체크 값이 들어간 배열의 크기를 비교해 작은 것은 시작시간 큰 것은 종료시간
   // 체크가 2개 일때에는 시작시간은 해당 value 그대로 들어감 종료시간은 value +1
   //체크와 체크사이의 것은 색깔바꿔주기(클릭 이벤트로 들어온게 아니라 이벤트 내에서 바꿔주기때문에 체크로 인식할까?)
 
   var arr = new Array();
   var first = ""; //문자열
   var second = ""; // 문자열
   var checkboxes = new Array();
   //--클릭 이벤트 START--
 
   $("input[type='checkbox']").on("click", function () {
     if (this.checked) {
       //해당 클릭이 체크인 상황 일 떄
       arr.push($(this).val()); // 체크 한 value값이 배열로 들어감
 
       if (arr.length > 2) {
         alert("배열의 길이는 " + arr.length);
         alert("두 개 이상의 값을 선택할 수 없습니다.");
         arr.pop();
         $(this).prop("checked", false);
       } else if (arr.length == 2) {
         //체크가 두 번째인 상태
 
         let firstSplit = arr[0].split(":"); //배열의 hh:00에서 :이후 부분 제거
         let firstNum = Number(firstSplit[0]); //hh부분을 숫자로 바꿔줌
         console.log("첫번째 선택은: " + firstNum);
         let secondSplit = arr[1].split(":");
         let secondNum = Number(secondSplit[0]);
         console.log("두번째 선택은: " + secondNum);
         if (firstNum < secondNum) {
           //첫번째 체크의 시간이 두번째 체크의 시간보다 작을떄 (08<09)
           first = firstNum;
           second = secondNum + 1; //종료시간에 값을 1을 넣어줌
 
           var gap = secondNum - firstNum;
 
           if (gap > 1) {
             for (var i = firstNum + 1; i <= secondNum; i++) {
               //체크 한 값 사이에 이미 예약되어 disable인 값있는지 확인
               var myselector = i;
 
               var myCheckbox = document.getElementById(i); // checkbox 요소를 가져옴
 
               if (myCheckbox.disabled === true) {
                 // 체크박스가 disable 상태인지 확인
                 console.log("Checkbox is disabled");
                 alert(
                   "선택한 시간 사이에 이미 예약이 존재합니다. 다시 선택해주세요"
                 );
                 arr.pop(); //배열에 들어온 값 반환
                 $(this).prop("checked", false); //체크한거 다시 해제
                 break;
               }
             }
           }
         
           
           $(".time").html("예약블록시간: " + first + "시 ~ " + second + "시");
         } else {
           //첫번째 체크의 시간이 두번째 체크의 시간 보다 클때 (09>08)
           first = secondNum;
           second = firstNum + 1;
           var gap = firstNum - secondNum;
 
           if (gap > 1) {
             // 체크 사이에 또다른 체크박스가 존재할 경우
 
             for (var i = secondNum + 1; i <= firstNum; i++) {
               //체크 한 값 사이에 이미 예약되어 disable인 값있는지 확인
               var myselector = i;
               var myCheckbox = document.getElementById(i); // checkbox 요소를 가져옴
 
               if (myCheckbox.disabled === true) {
                 // 체크박스가 disable 상태인지 확인
                 console.log("Checkbox is disabled");
                 alert(
                   "선택한 시간 사이에 이미 예약이 존재합니다. 다시 선택해주세요"
                 );
                 arr.pop(); //배열에 들어온 값 반환
                 $(this).prop("checked", false); //체크한거 다시 해제
 
                 break;
               }
             }
           }
           $(".time").html("예약블록시간: " + first + "시 ~ " + second + "시");
          
         }
       } else if (arr.length == 1) {
         // 체크가 첫 번째인 상태
         let firstSplit = arr[0].split(":"); //배열의 hh:00에서 :이후 부분 제거
         let firstNum = Number(firstSplit[0]); //hh부분을 숫자로 바꿔줌
         first = firstNum;
         second = firstNum + 1;
         $(".time").html("예약블록시간: " + first + "시 ~ " + second + "시");
        
         console.log("체크는 한개만 한 상태");
       }
     } else {
       //해당 클릭이 체크 해제 상황일때(즉 체크 해제하려고 클릭한 것)
       arr.pop(); //배열에서 제거
       if (arr.length == 1) {
         //체크 두개인 상태에서 한개 해제 했을 경우
 
         console.log("이시점에서 배열의 길이는 " + arr.length);
         let secondMinus = first + 1;
         $(".time").html("예약블록시간: " + first + "시 ~ " + secondMinus + "시");
        
       } else if (arr.length == 0) {
         //체크 한 개인 상태에서 해제 했을 경우(체크된게)
         $(".time").html("예약블록시간: ");
       
       }
     }
     if (first < 10) {
       firstValue = "0" + first + ":00";
     } else {
       firstValue = first + ":00";
     }
     if (second < 10) {
       secondValue = "0" + second + ":00";
     } else {
       secondValue = +second + ":00";
     }
   });
 
   console.log("벨류값은" + JSON.stringify(value));
 
 
   //예약 시작
   $(".btn").click(() => {
     var truefalse = confirm("해당 시간의 예약을 막으시겠습니까?")
     if(truefalse==true){
       
       var rDTO = {
         startTime: firstValue,
         endTime: secondValue,
         usingDate: date_input,
         roomSeq: roomSeq,
       };
   
       console.log("d퍼스트벨류는 " + firstValue + " 세컨드벨류: " + secondValue);
       // console.log("알디티오"+rDTO.startTime)
       $.ajax({
         xhrFields: {
           withCredentials: true,
         },
         url: backURL+"host/reservation/"+roomSeq,
         method: "POST",
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(rDTO),
   
         success: function () {
           alert("예약블록이 정상적으로 처리되었습니다");
           location.href = frontURL + "host/listreservation.html";
         },
         error: function (xhr) {
           alert("예약블록이 정상적으로 처리되지 않았습니다. 다시 시도하세요");
         },
       });
     }
   });
   // --예약기능 END--
 });
 