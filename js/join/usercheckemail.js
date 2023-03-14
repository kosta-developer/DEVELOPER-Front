$(() => {
    let url = backURL + 'join/users/emailcheck'
    let isCertification = false;
    let key = '';
    let email = '';
    let error ='';
    $('div.member>div.field>span.placehold-text>input#sendMail').click(function () {
        $("div.member>div.field>span.check>input#emailCheck").hide()
        $("div.member>div.check>input#sighupComplete").hide()

        email = $('div.member>div.field>span.placehold-text>#email').val();
        //console.log('사용자가 입력한 이메일: ' +  email);
     
        if (email == "") {
            alert('이메일을 입력해주세요.')
        } else {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: 'post',
                url: url,
                data: {
                    email: email
                },
                dataType: 'json',
                success : function(data) {
                    key = data.key;
                    error = data.error;
                    if(!key){
                        alert('내이름은 호세란')
                        alert(error);

                    }else {
                        //최종파일때는 지우기 테스트용으로 남겨두었다
                        //console.log('키값: ' + key);
                        alert("본인인증 메일을 발송했습니다. 이메일을 확인해주세요.");
                        $("div.member>div.field>span.check>input#emailCheck").show()
                        $('div.member>div.field>span.placehold-text>input#sendMail').hide()
                    }
                }
            });


        }
    })

    $("#emailCheck").click(function () {

        if ($("#code").val() == key) {   //인증 키 값을 비교를 위해 텍스트인풋과 벨류를 비교
            isCertification = true;  //인증 성공여부 check
            alert('인증이 완료되었습니다.')
            $("div.member>div.check>input#sighupComplete").show()
        } else {
            isCertification = false; //인증 실패
            alert('잘못된 인증번호입니다. 확인하여 다시 입력해주세요.')
        }
        return false;
    });

    $("div.member>div.check>input#sighupComplete").click(function(e){
        if(isCertification==false){ //인증이 완료되지 않았다면
            alert("메일 인증이 완료되지 않았습니다.");
        } else{
            localStorage.setItem("userEmail", email);
            location.href = frontURL + 'join/usersignup.html'
        }
        $("div.member>div.check>input#sighupComplet").hide()
        return false;
    });

    
})