
// let backURL = "http://172.30.1.15:8888/developer/";
// let frontURL = "http://172.30.1.15:5500/html/"; 
// userCheckIntervalLogined();
let queryParams = new URLSearchParams(window.location.search);
let lessonSeq = queryParams.get('lessonSeq');


// 주문번호 만들기 START
function createOrderNum(){
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  let orderNum = year + month + day;
  for(let i=0;i<10;i++) {
    orderNum += Math.floor(Math.random() * 8);	
  }
  return orderNum;
}
// 주문번호 만들기 END

// 결제 해야하는 수업 가져오기 START
function orderdetail() {
  $.ajax({
    xhrFields: {
       withCredentials: true
    },
    url : backURL+"mypage/tutor/upcoming/detail/"+lessonSeq,
    success: function(jsonObj){
      console.log(jsonObj)
      console.log(jsonObj.llist[0].lessonName)

      
      $("#name").html(jsonObj.llist[0].lessonName)


    }, 
    error: function(xhr){
        let jsonObj = JSON.parse(xhr.responseText);
        alert(jsonObj.msg);
    }
    

  })
}
$(document).ready(function() {
  orderdetail();
});
// 결제 해야하는 수업 가져오기 END

// 결제하기 START
function payment(pg_provider, mode, payment_method){
  IMP.init('imp85753634');
  let pg_mid;
  
  if(pg_provider == 'inicis'){

    if(mode=='test'){
      pg_mid = 'html5_inicis';
    }else{
      pg_mid = 'html5_inicis.MOI123123'
    }
    
  }else if(pg_provider=='kakao'){
    if(mode=='test'){
      pg_mid = 'kakaopay';
    }else{
      pg_mid = 'kcp.IOfds34';
    }
  }
  
  alert(pg_mid)
  const orderNum = createOrderNum();
  const data = {
    pg: pg_mid,
    pay_method : payment_method,
    merchant_uid : orderNum,
    name : "유료강의 결제테스트",
    amount : 3333,
    buyer_email : "",
    buyer_name : "",
    buyer_tel : ""
  };

  IMP.request_pay(data, response => {
    console.log(response)
    console.log(data)
    console.log(JSON.stringify(response))
    console.log('레슨시퀀스값'+lessonSeq);

    jQuery.ajax({
      xhrFields: {
         withCredentials: true
      },
      url: backURL+"orders/payment/callback_receive",
      method : "POST",
      headers : { "Content-Type" : "application/json"},
      data : JSON.stringify(response),
    }).done(function (rsp) {
          data.impUid = rsp.imp_uid;
          data.merchant_uid = rsp.merchant_uid;
          response.impUid = JSON.stringify(response.imp_uid);
          console.log('담아준 값은' + response.impUid)
    }).then((data) => {
      var impUid = JSON.parse(response.impUid)

        $.ajax({
        xhrFields: {
             withCredentials: true
                  },
            url: backURL+"orders/payment/add/"+lessonSeq,
            method: "POST",
            contentType : 'application/json',
            data: JSON.stringify({"imp_uid":impUid})         
      }).done(function(response) {
        console.log("DB에 값 저장 성공", response);
      
      }).then(function(){
        $.ajax({
                xhrFields: {
                withCredentials: true
                },
                method: "PUT",
                url: backURL+"mypage/tutor/pay/"+lessonSeq,             
        });
      }).done(function (response){
        console.log(lessonSeq+"번 강의의 payLesosn값 변경 완료",response)
      })

    alert('결제가 완료되었습니다.')
    location.href=frontURL+'mypage/tutor/main.html'
    }).fail(function() {
      alert('에러');
      location.href=frontURL+'index.html'
    })


  })
}
// 결제하기 END