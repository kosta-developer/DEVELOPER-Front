$(()=>{

    userCheckIntervalLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));

    let url = backURL+'mypage/main';
    let userId;
    userdetail();
function userdetail() {


    $.ajax({
        xhrFields: {
        withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        
        success: function(jsonObj){
            console.log(jsonObj)

            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > .userinformation > ul > li.name').html(jsonObj.name)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > .userinformation > ul > li.nickname').html(jsonObj.nickname)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > .userinformation > ul > li.userId').html(jsonObj.userId)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > .userinformation > ul > li.email').html(jsonObj.email)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > .userinformation > ul > li.tel').html(jsonObj.tel)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > .userinformation > ul > li.addr').html(jsonObj.addr)
            userId = jsonObj.userId;

        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });


    $(document).on('click', '#delete', function(){
    console.log(userId)
    let url = backURL +'mypage/delete/'+userId

        $.ajax({
            xhrFields: {
            withCredentials: true
            },
            url: url,
            // data: data,
            method : 'PUT',
            success: function(){
                alert('탈퇴가 완료되었습니다')
                // console.log(userId+'님의'+'탈퇴가 완료되었습니다.')
                location.href = frontURL + '/index.html';

            $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'users/logout',
            success: function () {
                showMenuAtLogouted()
                sessionStorage.removeItem("logined");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("hostlogined")
                sessionStorage.removeItem("hostready");
                // alert("로그아웃성공")
                location.href = frontURL + 'index.html'
                }
                })
                return false

            },
            error : function(){
                alert('탈퇴실패');
            }
            
            
        });
        
    
    });


    $(document).on('click', '#modify', function(){
    console.log(userId)
    location.href = frontURL + 'mypage/userupdate.html?userId='+userId


    });




}



    // 회원이 탈퇴 버튼을 눌렀을때 START

    // 회원이 탈퇴 버튼을 눌렀을때 END
    
    // 회원이 수정 버튼을 눌렀을때 START

});

// 회원이 로고를 눌렀을때 START
$(document).on('click', '#logo', function(){
    location.href = frontURL + 'index.html';
});
// 회원이 로고를 눌렀을때 END



