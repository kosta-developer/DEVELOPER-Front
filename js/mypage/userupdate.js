$(()=>{

    userCheckIntervalLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));

    let userId;
    userdetail();
    // function userdetail() {
        
    //     let url = backURL+'mypage/main';

    // $.ajax({
    //     xhrFields: {
    //     withCredentials: true //크로스오리진을 허용!
    //     },
    //     url: url,
        
    //     success: function(jsonObj){
    //         console.log(jsonObj)

    //         $('#name').val(jsonObj.name)
    //         $('#nickname').val(jsonObj.nickname)
    //         $('#userId').val(jsonObj.userId)
    //         $('#email').val(jsonObj.email)
    //         $('#tel').val(jsonObj.tel)
    //         $('#addr').val(jsonObj.addr)
    //         userId = jsonObj.userId;

    //         $(document).on('click', '#modify', function() {
        
    //             $.ajax({
    //             xhrFields: {
    //             withCredentials: true
    //             },
    //             url: backURL + 'mypage/update/'+userId,
    //             // data: data,
    //             method : 'PUT',
    //             success: function(){
    //                 alert('수정이 완료되었습니다')
    //                 console.log(userId+'님의'+'수정이 완료되었습니다.')
    //                 location.href = frontURL + '/mypage/main.html';
        
        
    //             },
    //             error : function(){
    //                 alert('수정실패');
    //             }
                
                
    //         });
        
        
    //         })
    //     },
    //     error : function(xhr){
    //         let jsonObj = JSON.parse(xhr.responseText);
    //         alert(jsonObj.msg);
    //     }


    // });







    // }
    

    function userdetail() {
    let url = backURL + 'mypage/main';

    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,

        success: function (jsonObj) {
            console.log(jsonObj)

            $('#name').val(jsonObj.name)
            $('#nickname').val(jsonObj.nickname)
            $('#userId').val(jsonObj.userId)
            $('#email').val(jsonObj.email)
            $('#tel').val(jsonObj.tel)
            $('#addr').val(jsonObj.addr)
            const userId = jsonObj.userId;


            
            
            
            $('#modify').on('click', function () {
                let nickname = $('#nickname').val();
                let name = $('#name').val();
                let tel = $('#tel').val();
                let addr = $('#addr').val();
                let userId = $('#userId').val();
                let pwd = $('#pwd').val();
             
                
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: backURL + 'mypage/userupdate',
                    method: 'PUT',
                    data: JSON.stringify({
                        "nickname" : nickname,
                        "name" : name,
                        "tel" : tel,
                        "addr" : addr,
                        "pwd" : pwd

                    }),
                    headers : { "Content-Type" : "application/json"},
                    success: function () {
                        alert('수정이 완료되었습니다')
                        console.log(userId + '님의' + '수정이 완료되었습니다.')
                        location.href = frontURL + '/mypage/main.html';

                    },
                    error: function () {
                        alert(xhr.status+'수정실패');
                    }
                });
            });
        },
        error: function (xhr) {
            const jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
}



})