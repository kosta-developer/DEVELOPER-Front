$(() => {
    $('div.findUserPwd-find-content>div.input-email>button#email-submit').click(function () {

        let userId = $('div.findUserPwd-find-content>div.input-email>input#userId').val();
        let userEmail = $('div.findUserPwd-find-content>div.input-email>input#userEmail').val();

        console.log(userId)
        console.log(userEmail)

        let url = backURL + 'users/searchpwd'

        if (userId == "" || userEmail == "") {
            alert('정보를 입력해주세요')
        } else {

            $.ajax({
                xhrFields: {
                    withCredentials: true //크로스오리진을 허용!
                },
                url: url,
                method: 'post',
                data: {
                    email: userEmail,
                    userId: userId
                },
                dataType: 'json',
                success: function (result) {
                    console.log(result)
                    if (result == true) {
                        alert('임시 비밀번호가 발송되었습니다. 메일을 확인해주세요.')
                        //window.location.reload()
                        //location.href = frontURL + 'index.html'
                    } else {
                        alert('잘못된 정보입니다. 올바른 ID와 Email을 입력해주세요.')
                    }
                },
                error: function (xhr) {
                    alert(xhr.status)
                }
            })
        }
    })
})



// // --email 입력 버튼 클릭시 START
// verifyEmail = function () {
//     // 이메일 검증 스크립트 작성
//     var emailVal = $("#inputemail").val();
//     var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//     // 검증에 사용할 정규식 변수 regExp에 저장
//     if (emailVal.match(regExp) != null) {
//         alert('Email 이 발송되었습니다.');
//     } else {
//         alert('Email 형식이 일치하지 않습니다.');
//     }
// };
// // --전화번호 인증요청 버튼 클릭시 START
// verifyPhone = function() {
//   // 전화번호 검증 스크립트 작성
//   var phoneVal = $("#inputphonenum").val();
//   var regExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

//   // 검증에 사용할 정규식 변수 regExp에 저장
//   if (phoneVal.match(regExp) != null) {
//     alert('인증메일이 발송되었습니다.');
//   }
//   else {
//     alert('전화번호 형식이 일치하지 않습니다.');
//   }
// };
// // --전화번호 인증요청 버튼 클릭시 END

