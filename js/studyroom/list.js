$(()=>{
    userCheckLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));
    //--스터디 카페 목록 보여주기용 함수 START --
    function showList(result){
        //카페별 div  
        let $cafeList = $('div.content-container>div.studycafe>div.studycafeList')
        //원본
        let $origin = $cafeList.first()
        $origin.show()

        //원본의 복제본들 
        let $removeCafeList = $cafeList.not($origin)
        //복제본 삭제 
        $removeCafeList.remove()
        
        let $parent = $origin.parent()
        $(result).each((index,s)=>{
            let srSeq =s.srSeq;
            let imgPath=s.imgPath;
            let name=s.name;
            let addr=s.addr;
            let price=s.roomInfoPriceAndPersonDTO.price;
            let person2=s.roomInfoPriceAndPersonDTO.person;
            let favCnt=s.favoritesStudyroomUserIdDTO.userIdDTO.fvCNT;
           //--이미지 부분은 세란님(호스트 가입시 이미지 업로드 되는 부분) 병합이후 변경 예정 

            let $copy=$origin.clone()
            let $imgObj=$('<img id="cafeimg">') 
            $imgObj.attr('src', '../../images/' + imgPath)
            
            $copy.find(".srSeq").html(srSeq)
            $copy.find(".img").html($imgObj)
            $copy.find(".name").html(name)
            $copy.find(".addr").html(addr)
            $copy.find(".price").html(price + '원/시간')
            $copy.find(".person").html('최대 '+person2+'인')
            $copy.find(".favCnt").html('🌟'+favCnt)
            $copy.find(".srbtn").html('<input type="button" onclick="location.href='+"'"+frontURL+'studyroom/roominfo.html?'+srSeq+"'"+'" value="자세히보기" class="srbtn" >')
            $parent.append($copy)
        })
        $origin.hide()           
    }
    //--스터디 카페 목록 보여주기용 함수 END

    let url = backURL + 'studyroom/'
    let url3= backURL + 'studyroom/roominfo/'
    // ----메인 리스트 출력 START----
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
       
        url : url,
        method:"GET",
       
        success:function(result){
            showList(result)
        }, error:function(xhr){
            alert(xhr.responseText)
        } 
        
    })
     // ----메인 리스트 출력 END----
   
    //--검색 버튼 클릭 START--

    $('#btn').click(()=>{
        console.log('검색버튼시작')
       
        let url2= backURL+'studyroom/list'
 
        var params ={
            srNameAddrName: $("#srNameAddrName").val(),
            searchBy: $("#searchBy").val(),
            person: $("#person").val(),
            orderBy: $("#orderBy").val() 
        }
       
       var queryString1 =Object.values(params)[0];
       var queryString2 =Object.values(params)[1];
       var queryString3 =Object.values(params)[2];
       var queryString4 =Object.values(params)[3];
       let srNameAddrNameQS = queryString1;
       let searchByQS = queryString2;
       let personQS = queryString3;
       let orderByQS = queryString4
       
        $.ajax({
            xhrFields: {
            withCredentials: true
        },
            
            url : url2,
            method:"POST",
            data: params ,
            success: function(result){
                showList(result)                     
            } , error:function(xhr){
                alert("검색 내역이 존재하지 않습니다.")
            }
        })
     
    })
    
   
    
   

})
    


