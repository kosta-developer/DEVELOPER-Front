$(() => {

    const email = localStorage.getItem("hostEmail");
    console.log(email)
    $('div.hostMember>div.field>input#email').attr('value', email);
    localStorage.removeItem("hostEmail");

    $('#checkHostId').click(function(){
        let hostId = $('div.hostMember>div.field>span.placehold-text>#hostId').val();

        console.log('유저아이디는'+hostId)
        $.ajax({
            url : backURL+'join/users/check/'+hostId,
            type : 'get',
            data : hostId,
            success : function(data){
                if(data == false ) {
                    alert('사용 가능한 아이디')
                } else {
                    alert('사용 불가능한 아이디')
                }

            }
        })
    })


    $('#hostPwdCheck').click(function(){
        let pwd = $('div.hostMember>div.field>#pwd').val();
        let pwd2 = $('div.hostMember>div.field>#pwd2').val();
        
        if (pwd != pwd2){
            alert('비밀번호가 일치하지 않습니다')
        } else {
            alert('비밀번호가 일치합니다.')
        }
    })


    $('div.hostMember>div.join>#join').click(function(){
        let hostId = $('div.hostMember>div.field>span.placehold-text>#hostId').val();
        let pwd = $('div.hostMember>div.field>#pwd').val();
        let pwd2 = $('div.hostMember>div.field>#pwd2').val();
        let name = $('div.hostMember>div.field>#name').val();
        let num = $('div.hostMember>div.field>#num').val();
        let email = $('div.hostMember>div.field>#num').val();
        let tel = $('div.hostMember>div.field>div>#tel').val();
        
        if (hostId ==''){
            alert('아이디가 입력되지 않았습니다');
            return
        }
        
        if (pwd ==''){
            alert('비밀번호가 입력되지 않았습니다');
            return
        }
        
        if (pwd2 ==''){
            alert('비밀번호가 재입력되지 않았습니다')
        }
        
        if (name ==''){
            alert('이름이 입력되지 않았습니다');
            return
        }

        if (num ==''){
            alert('사업자번호가 입력되지 않았습니다');
            return
        }
        
        if (email ==''){
            alert('이메일이 입력되지 않았습니다');
            return
        }
        
        if (tel ==''){
            alert('연락처가 입력되지 않았습니다');
            return
        }
        
        if (pwd != pwd2){
            alert('비밀번호가 일치하지 않습니다')
            
        } else {
            let data = {
                'hostId' : hostId,
                'pwd' : pwd,
                'name' : name,
                'num' : num,
                'email' : email,
                'tel' : tel,
            }
            console.log(data)

            $.ajax({
                contentType: "application/json",
                method :'POST',
                url : backURL+'join/hostuser',
                data : JSON.stringify(data),
                
                success:function(){
                    console.log(data);
                    alert('회원가입이 완료되었습니다!');
                    localStorage.setItem("hostId", hostId);
                    location.href = frontURL+'join/addstudycafe.html'
                },
                error: function(response) {
                    alert('회원가입 실패!');
                }
            })
        }
    })
})