$(()=>{
    // let url = backURL+'mypage/main';
    let url = 'http://172.30.1.15:8888/developer/mypage/main'

    $.ajax({
        xhrFields: {
        withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        
        success: function(jsonObj){
            console.log(jsonObj)

            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > ul > li.name').html(jsonObj.name)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > ul > li.nickname').html(jsonObj.nickname)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > ul > li.userId').html(jsonObj.userId)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > ul > li.email').html(jsonObj.email)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > ul > li.tel').html(jsonObj.tel)
            $('#content-wrap >.mypage-body-wrap >.content-container > div >.userDetail >.userinfo > ul > li.addr').html(jsonObj.addr)
        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });

    // 회원이 탈퇴 버튼을 눌렀을때 START
    $(document).on('click', '#userDelete', function(event){
        // let url = backURL+'users/deleteusers';
        let userId = $(event.target).parent().find('li.userId').html()
        console.log(userId)
        let url = 'http://172.30.1.15:8888/developer/mypage/delete/'+userId
        // let data = userId
        
        $.ajax({
            url: url,
            // data: data,
            method : 'PUT',
            success: function(){
                alert('탈퇴가 완료되었습니다')
                console.log(userId+'님의'+'탈퇴가 완료되었습니다.')
                // location.href = frontURL + '/signup/signup.html';
            },
            error : function(){
                alert('탈퇴실패');
            }
            
            
        });
        
    
    });
    // 회원이 탈퇴 버튼을 눌렀을때 END
    
    // 회원이 수정 버튼을 눌렀을때 START

});

// 회원이 로고를 눌렀을때 START
$(document).on('click', '#logo', function(){
    location.href = frontURL + 'index.html';
});
// 회원이 로고를 눌렀을때 END



