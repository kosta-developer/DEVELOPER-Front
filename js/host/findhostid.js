$(() => {
  
  $('input#numsubmit').click(function(event) {
    event.preventDefault();

    let inputNumValue = $('#inputnum').val();
    alert("값"+inputNumValue);
    // 입력한 값이 변수 inputNumValue에 담김
    console.log(inputNumValue);
    let url = backURL + 'host/findhostid'
          $.ajax({
              xhrFields: {
                  withCredentials: true //크로스오리진을 허용!
              },
              url: url,
              method: 'get',
              data: {"num" : inputNumValue},
              //data: inputNumValue,
              success: function (jsonObj) {
                alert(jsonObj)
              },
              error: function (xhr) {
                  alert(xhr.status)
              }
          })
  });

})

