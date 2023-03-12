$(() => {
    // 로그인 버튼 클릭되었을시 START
    $('div.login_inpbox').submit(() => {
        let idValue = $('input[name=userId]').val()
        let pwdValue = $('input[name=pwd]').val()
        let url = backURL + 'users/login'
        let data = $('div.login_inpbox>form').serialize()
        console.log("serialize값:", data)

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: url,
            method: 'post',
            data: data,
            success: function (jsonObj) {
                console.log(jsonObj)
                location.href = frontURL
            },
            error: function (xhr) {
                alert(xhr.responseText)
            }
        })
        return false;
    });

    // 회원가입 버튼 클릭되었을시 START
    $('.login_btn1').on("click", function () {
        location.href = frontURL + "index.html";
    });
})