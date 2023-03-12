$(() => {
  
    $('input#emailsubmit').click(function(event) {
      event.preventDefault();
  
      let inputEmailValue = $('#inputemail').val();
      // 입력한 값이 변수 inputNumValue에 담김
      console.log(inputEmailValue);
      let url = backURL + 'users/findId'
            $.ajax({
                xhrFields: {
                    withCredentials: true //크로스오리진을 허용!
                },
                url: url,
                method: 'get',
                data: {"email" : inputEmailValue},
                //data: inputNumValue,
                success: function (jsonObj) {
                  alert("아이디는: "+jsonObj.userId+"입니다!")
                  location.href = location.href;
                }, 
                error: function (xhr) {
                    alert("일치하는 아이디가 없습니다!")
                    location.href = location.href
                }
            })
    });
  
  })
  
  