$(() => {
    hostCheckIntervalLogined()


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
            console.log(jsonObj)
            let $hostInfo = $('div.detail-content-box');
            $hostInfo.find('input#hostuser-id').val(jsonObj.hostId)
            $hostInfo.find('input#hostuser-pwd').val(jsonObj.pwd)
            $hostInfo.find('input#hostuser-num').val(jsonObj.num)
            $hostInfo.find('input#hostuser-name').val(jsonObj.name)
            $hostInfo.find('input#hostuser-tel').val(jsonObj.tel)
            $hostInfo.find('input#hostuser-email').val(jsonObj.email)

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
    $('#content-wrap > div > div.content-container > div.detail-content-box > div.info-button > input[type=button]:nth-child(2)').click((e) => {
        pwdVal = $('input#hostuser-pwd').val();
        telVal = $('input#hostuser-tel').val();
        emailVal = $('input#hostuser-email').val();

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
    $('#content-wrap > div > div.content-container > div.detail-content-box > div.info-button > input[type=button]:nth-child(1)').click((e) => {
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
                    alert('탈퇴가 완료되었습니다. 그동안 DEVELOPER를 이용해주셔서 감사합니다.')
                    location.href = frontURL + 'index.html'
                },
                error: function (xhr) {
                    alert(xhr.status)
                }
            })
        } else if (confirm == false) {
            //취소 버튼 클릭 시 이벤트
            //location.href = frontURL + 'hostuser/editHost.html'
            //self.close();

            self.opener = self;
            window.close;
        }
    }

    $('button#out').click((e) => {
        confirmModal()

    })
    //--탈퇴버튼 클릭 시 할일 END--

})