$(()=>{
  
    checkIntervalLogined();
    //--Sysdate 구하기 START--
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const Sysdate = year + '-' + month + '-' + day;
    //--Sysdate 구하기 END--

       
    //--예약내역 출력 START--
     $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+"mypage/studyroom",
        method:"GET",
        success: function(jsonObj){
             let $origin = $('.history').first()
             let $parent = $origin.parent()
            $(jsonObj).each((index,p)=>{
                let resSeq = p.resSeq;
                let usingDate =p.usingDate;
                let startTime=p.startTime;
                let endTime=p.endTime;
                let rName=p.roomInfoNameDTO.name;
                let sName=p.roomInfoNameDTO.studyroomNameDTO.name;

                let $copy=$origin.clone()
                $copy.find(".resSeq").html(resSeq)
                 $copy.find(".sName").html(sName)
                 $copy.find(".rName").html(rName)
                 $copy.find(".usingDate").html(usingDate)
                 $copy.find(".time").html(startTime+" ~ "+endTime)
                 if(usingDate<Sysdate){
                    $copy.find("#btn").attr('style',"display:none;")
                 }
                $parent.append($copy)
                 

            })
            $origin.hide()
        }, error:function(xhr){
            alert(xhr.responseText)
        } 
     })
     //--예약내역 출력 END--

     //--예약취소 START--   
     $(document).on('click','#btn', (e)=>{
       
       
        let resSeq =$(e.target).children().text();
        var check = confirm("해당 예약을 삭제하시겠습니까?");
        if(check){

            $.ajax({
                xhrFields: {
                   withCredentials: true
               },
               url: backURL+"mypage/studyroom/"+resSeq,
               method:"DELETE",
               success: function(){
                 location.href = frontURL+"mypage/reshistory.html"
               }, error:function(xhr){
            alert(xhr.responseText)
        } 
         })
        }
    })
     //--예약취소 END-- 


   
})