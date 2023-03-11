$(() => {
  const randomString = function randomString () {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 6
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
  }

  let merchant_uid;

  function initPayment() {
    merchant_uid = randomString();
    let pg_provider = 'inicis';
    let mode = 'test';
    let payment_method = 'card';

    const data = {
      pg: pg_provider === 'inicis' ? mode === 'test' ? 'html5_inicis' : 'html5_inicis.MOI123123' : pg_provider === 'kakao' ? mode === 'test' ? 'kakaopay' : 'kcp.IOfds34' : '',
      pay_method: payment_method,
      merchant_uid: merchant_uid,
      name: '유료강의 결제테스트',
      amount: 3333,
      buyer_email: '',
      buyer_name: '',
      buyer_tel: ''
    };

  IMP.request_pay(data, response => {
    alert('callback! : ' +JSON.stringify(response));
    console.log(response)
    console.log(data)
    console.log(JSON.stringify(response))

    jQuery.ajax({
      xhrFields: {
         withCredentials: true
      },
      url: "http://192.168.0.9:8888/developer/orders/payment/callback_receive",
      // url: "http://172.30.1.15:8888/developer/orders/payment/add/1",
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
            url: "http://192.168.0.9:8888/developer/orders/payment/add/3",
            // url: "http://172.30.1.15:8888/developer/orders/payment/add/1",
            // url: "http://172.20.10.7:8888/developer/orders/payment/add/1",
            method: "POST",
            contentType : 'application/json',
            data: JSON.stringify({"imp_uid":impUid})         
          })
          alert('결제완료')
          location.href=frontURL+'index.html'
    }).fail(function() {
      alert('에러');
      // location.href=frontURL+'index.html'
    })
  })
}
})
