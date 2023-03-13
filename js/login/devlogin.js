$(() => {
    // 일반 로그인 버튼 클릭되었을시 START
    $('#login_btn').click(function(){
        let idValue = $('input[name=userId]').val()
        let pwdValue = $('input[name=pwd]').val()
        let url = backURL + 'users/login'
        let data = $('#userLoginform').serialize()
        //console.log("serialize값:", data)
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: url,
            method: 'post',
            data: data,
            success: function (jsonObj) {
               // alert('로그인 성공 !')
               let sessionData = "logined"
               sessionStorage.setItem("logined", jsonObj.userId)
               sessionStorage.setItem("role", jsonObj.role)
               console.log(sessionData);
               // console.log(jsonObj)
                location.href = frontURL + 'index.html'
            },
            error: function (xhr) {
                alert(xhr.responseText)
            }
        })
        return false;
    });
    // 일반 로그인 버튼 클릭되었을시 END

    // 호스트 로그인 버튼 클릭되었을시 START
    $('#hostlogin_btn').click(function() {
        let url = backURL + 'host/login'
        let data = $('#hostLoginform').serialize()
        //console.log("serialize값:", data)
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: url,
            method: 'post',
            data: data,
            success: function (jsonObj) {
                let sessionData = "hostlogined"
                sessionStorage.setItem("hostlogined", jsonObj.hostId)
                sessionStorage.setItem("hostready", jsonObj.ready)
                console.log(sessionData);
                location.href = frontURL + 'hostindex.html'
            },
            error: function (xhr) {
                alert(xhr.responseText)
            }
        })
        return false;
    });
    // 호스트 로그인 버튼 클릭되었을시 End

    //체크 박스 선택시 START
    $('#ulogin').click( function () {
            $('#userLogin').show();
            $('#hostLogin').hide();
            $('#hlogin').prop("checked",false)
        });
        
    $('#hlogin').click( function () {
            $('#userLogin').hide();
            $('#hostLogin').show();
            $('#ulogin').prop("checked",false)
        });
    //체크 박스 선택시 END
   
})