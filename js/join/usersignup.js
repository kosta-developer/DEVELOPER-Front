$(() => {
    const email = localStorage.getItem("userEmail");
    console.log(email)
    $('div.member>div.field>#email').attr('value', email);
    localStorage.removeItem("userEmail");
    

    $('div.member>div.join>#join').click(function(){
        let userId = $('div.member>div.field>span.placehold-text>#userId').val();
        let pwd = $('div.member>div.field>#pwd').val();
        let pwd2 = $('div.member>div.field>#pwd2').val();
        let name = $('div.member>div.field>#name').val();
        let nickname = $('div.member>div.field>#nickname').val();
        let tel = $('div.member>div.field>div>#tel').val();
        let email = $('div.member>div.field>#email').val();
        //let addr = $('div.member>div.field>#addr').val();
        let addr = $('input#sample6_address').val(); // 주소 변수
        console.log('addr:' + addr);
        let extraAddr = $('input#sample6_extraAddress').val(); // 참고항목 변수
        console.log('extraAddr:' + extraAddr);
        let detailAddr = $('input#sample6_detailAddress').val(); //상세주소 변수
        console.log('detailAddr:' + detailAddr);
        let subAddr = $('input#sample6_extraAddress').val();
        console.log('subAddr:' + subAddr);
        let sumAddr = addr + subAddr + ' ' + detailAddr
        console.log('sumAddr:' + sumAddr);
        
        if (userId ==''){
            alert('아이디가 입력되지 않았습니다');
            return
        }
        
        if (pwd ==''){
            alert('비밀번호가 입력되지 않았습니다');
            return
        }
        
        if (pwd2 ==''){
            alert('비밀번호가 재확인되지 않았습니다')
        }
        
        if (name ==''){
            alert('이름이 입력되지 않았습니다');
            return
        }

        if (nickname ==''){
            alert('닉네임이 입력되지 않았습니다');
            return
        }
        
        if (tel ==''){
            alert('연락처가 입력되지 않았습니다');
            return
        }
        
        if (email ==''){
            alert('이메일이 입력되지 않았습니다');
            return
        }
        
        if (pwd != pwd2){
            alert('비밀번호가 일치하지 않습니다')
            
        } else {
            let data = {
                'userId' : userId,
                'pwd' : pwd,
                'name' : name,
                'nickname' : nickname,
                'email' : email,
                'tel' : tel,
                'addr' : sumAddr
            }
            console.log(data)

            $.ajax({
                method :'POST',
                url : backURL+'users/joinusers',
                data : JSON.stringify(data),
                
                success:function(){
                    console.log(data);
                    alert('회원가입이 완료되었습니다!');
                    window.location.href = '';
                    return index.html
                },
                error: function(response) {
                    alert('회원가입 실패!');
                }
            })
        }
    })


    
   
})