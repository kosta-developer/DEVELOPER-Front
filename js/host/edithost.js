$(() => {
    hostCheckIntervalLogined()

    $('span#showLoginId').html(sessionStorage.getItem("hostlogined"));

    //----정보 출력 START----
    let url = backURL + 'host/info'
    let pwdVal;
    let telVal;
    let emailVal;


    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            //console.log(jsonObj)
            let $hostInfo = $('div#host-infomation-box');
            $hostInfo.find('input#hostuser-id').val(jsonObj.hostId)
            $hostInfo.find('input#hostuser-pwd').val(jsonObj.pwd)
            $hostInfo.find('input#hostuser-num').val(jsonObj.num)
            $hostInfo.find('input#hostuser-name').val(jsonObj.name)
            $hostInfo.find('input#hostuser-tel').val(jsonObj.tel)
            $hostInfo.find('input#hostuser-email').val(jsonObj.email)

            pwdVal = $('input#hostuser-pwd').val();
            telVal = $('input#hostuser-tel').val();
            emailVal = $('input#hostuser-email').val();

            console.log('pwd:' + pwdVal);
            console.log('tel:' + telVal);
            console.log('email:' + emailVal);


        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })

    //----정보 출력 END----


    //--수정완료버튼 클릭 시 할일 START--
    $('#editBtn').click((e) => {

        pwdVal = $('input#hostuser-pwd').val();
        telVal = $('input#hostuser-tel').val();
        emailVal = $('input#hostuser-email').val();

        console.log('pwd:' + pwdVal);
        console.log('tel:' + telVal);
        console.log('email:' + emailVal);

        var phonenum = telVal;
        var regPhone = /(010)[-](\d{3}|\d{4})[-](\d{4}$)/g;

        var checkPwd = $('input#hostuser-pwd').val();
        var num = checkPwd.search(/[0-9]/g);
        var eng = checkPwd.search(/[a-z]/ig);

        //이메일 유효성 검사
        var email_rule =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!email_rule.test(emailVal)){
          alert("올바른 이메일 형식으로 입력해주세요.");
          return false;
        }

         //비밀번호 유효성 검사
        if (checkPwd.length < 6 || checkPwd.length > 12) {

            alert("6자리 ~ 12자리 이내로 입력해주세요.");
            return false;

        } else if (checkPwd.search(/\s/) != -1) {
            alert("비밀번호는 공백 없이 입력해주세요.");
            return false;

        } else if (num < 0 || eng < 0) {
            alert("새 비밀번호는 영문, 숫자를 혼합하여 입력해주세요.");
            return false;
        } 

        //휴대번호 유효성 검사
        if (!regPhone.test(phonenum)) {
            alert('잘못된 형식의 휴대번호입니다.');
            $('input#hostuser-tel').focus();
            return false;
        }

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: url,
            method: 'put',
            contentType: 'application/json',
            data: JSON.stringify({
                "pwd": pwdVal,
                "tel": telVal,
                "email": emailVal
            }),
            success: function () {
                alert('회원 정보 수정이 완료되었습니다')
                location.href = frontURL + 'hostindex.html'
            },
            error: function (xhr) {
                alert(xhr.status)
            }
        })
    })

    //--수정완료버튼  클릭 시 할일 END--


    //--취소버튼 클릭 시 할일 START--
    $('#cancel').click((e) => {
        location.href = frontURL + 'hostindex.html'
    })
    //--취소버튼 클릭 시 할일 END--



    //--탈퇴버튼 클릭 시 할일 START--
    function confirmModal() {
        let confirm = window.confirm("정말 탈퇴하시겠습니까?");

        if (confirm == true) {
            //확인 버튼 클릭 시 이벤트
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: backURL + 'host/out',
                method: 'put',
                contentType: 'application/json',
                success: function () {
                    alert('탈퇴가 완료되었습니다.\n그동안 DEVELOPER를 이용해주셔서 감사합니다.')
                    location.href = frontURL + 'index.html'
                },
                error: function (xhr) {
                    alert(xhr.status)
                }
            })
        } else if (confirm == false) {
            self.opener = self;
            window.close;
        }
    }

    $('button#out').click((e) => {
        confirmModal()

    })
    //--탈퇴버튼 클릭 시 할일 END--

})