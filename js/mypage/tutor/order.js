
let queryParams = new URLSearchParams(window.location.search);
let lessonSeq = queryParams.get('lessonSeq');


// 주문번호 만들기
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

let backURL = 'http://localhost:8888/developer/';
let frontURL = "http://localhost:5500/html/";


function orderdetail() {
  $.ajax({
    xhrFields: {
       withCredentials: true
    },
    url : "http://172.30.1.15:8888/developer/mypage/tutor/upcoming/detail/"+lessonSeq,
    success: function(jsonObj){
      console.log(jsonObj)

      $('#name').html(jsonObj.llist[0].lessonName)


    }, 
    error: function(xhr){
        let jsonObj = JSON.parse(xhr.responseText);
        alert(jsonObj.msg);
    }
    

  })
}

orderdetail();


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
    alert('callback! : ' +JSON.stringify(response));
    console.log(response)
    console.log(data)
    console.log(JSON.stringify(response))
    console.log('레슨시퀀스값'+lessonSeq);

    jQuery.ajax({
      xhrFields: {
         withCredentials: true
      },
      // url: "http://192.168.0.9:8888/developer/orders/payment/callback_receive",
      url: "http://172.30.1.15:8888/developer/orders/payment/callback_receive",
      // url: "http://172.20.10.7:8888/developer/orders/payment/add/1",
      method : "POST",
      headers : { "Content-Type" : "application/json"},
      data : JSON.stringify(response),
      //여기까지는 들어감.
    }).done(function (rsp) {
          //결제 성공시 로직,
          data.impUid = rsp.imp_uid;
          data.merchant_uid = rsp.merchant_uid;
          console.log('이거 뭐냐면~~'+JSON.stringify(response));
          console.log('언더바있는거->이게맞다'+JSON.stringify(response.imp_uid));
          response.impUid = JSON.stringify(response.imp_uid);
          console.log('담아준 값은' + response.impUid)
          // paymentComplete(response.impUid);
          alert('결제가 완료되었습니다.')
      // })
    }).then((data) => {
      console.log(JSON.parse(response.impUid))
      console.log(response.impUid)
      var impUid = JSON.parse(response.impUid)
      console.log('이젠 좀 돼라'+ impUid)
      console.log('이건 키 값 담아준거'+{imp_uid:impUid})
      console.log('제이슨바꾸기'+JSON.stringify({"imp_uid":impUid}))
        $.ajax({
        xhrFields: {
             withCredentials: true
                  },
            // headers : { "Content-Type" : "application/json"},
            // url: "http://192.168.0.9:8888/developer/orders/payment/add/3",
            url: "http://172.30.1.15:8888/developer/orders/payment/add/"+lessonSeq,
            // url: "http://172.20.10.7:8888/developer/orders/payment/add/1",
            method: "POST",
            contentType : 'application/json',
            data: JSON.stringify({"imp_uid":impUid})         
      })
    alert('결제완료')
    location.href=frontURL+'signup/hostCheckEmail.html'
    }).fail(function() {
      alert('에러');
      location.href=frontURL+'index.html'
    })


  })
}