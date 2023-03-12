$(()=>{

    checkIntervalLogined();
    //--작성한 후기 리스트 출력 START--
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: "http://localhost:8888/developer/mypage/roomreview",
        method:"GET",
        success: function(jsonObj){
            let $origin = $('div.review-content1').first()
            let $parent = $origin.parent()
            $(jsonObj.selectMyRmRvDTO).each((index,a)=>{
                let cdate=a.cdate;
                let star=a.star;
                let rName=a.rrsaDTO.roomInfoNameDTO.name;
                let sName=a.rrsaDTO.roomInfoNameDTO.studyroomNameDTO.name;
                 let content=a.content;
                let $copy=$origin.clone()
                 $copy.find(".sName").html(sName)
                 $copy.find(".rName").html(rName)
                 $copy.find(".cdate").html(cdate)
                  $copy.find("#reviewTextBox").html(content)
                 
                 let starcnt=""   
                for (i = 0; i<= star ; i++){

                    starcnt="🌟".repeat(i+1);

                    }   
                 $copy.find(".star").html(starcnt)
                 $parent.append($copy)
                 
            })
             $origin.hide()
        }, error:function(xhr){
            alert(xhr.responseText)
        } 
    })
//--작성한 후기 리스트 출력 END--
//--미작성 후기 리스트 출력 START--
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: "http://localhost:8888/developer/mypage/roomreview",
        method:"GET",
        success: function(jsonObj){
            let $origin = $('div.review-content2').first()
            let $parent = $origin.parent()
            $(jsonObj.selectRmRvDTO).each((index,a)=>{
                let resSeq=a.resSeq;
                let startTime=a.startTime;
                let endTime=a.endTime
                let usingDate=a.usingDate
                let sName=a.roomInfoNameDTO.studyroomNameDTO.name;
                let rName=a.roomInfoNameDTO.name;
               

                let $copy=$origin.clone()
                $copy.find(".seqQuery").html(resSeq)
                 $copy.find(".sName2").html(sName)
                 $copy.find(".sNamequery").html(sName)
                
                 $copy.find(".rName2").html(rName)
                 $copy.find(".rNamequery").html(rName)
                 $copy.find(".usingDate2").html(usingDate)
                 $copy.find(".time").html(startTime+" ~ "+endTime)
                 $parent.append($copy)
                 
            })
             $origin.hide()
        }, error:function(xhr){
            alert(xhr.responseText)
        } 
    })
//--미작성 후기 리스트 출력 END--
        //--후기 작성 버튼 START--
     $(document).on('click','#reviewbtn', (e)=>{
       let srName=$(e.target).children('div.sNamequery').text()
       let roomName=$(e.target).children('div.rNamequery').text()
       let resSeq=$(e.target).children('div.seqQuery').text()
       location.href =
         frontURL+"mypage/roomreview.html?" +
         srName +
         "&" +
         roomName +
         "&" +
         resSeq;
     
    })
     //--후기 작성 버튼 END--


        //--자세히 보기 버튼 START--
       $(document).on('click','#viewBtn', (e)=>{
       //let srName=$(e.target).parent('div.review-content1').find('#reviewTextBox').attr("style","display:block;")
       $(e.target).parent("div.review-content1").find("#reviewTextBox")
       if (
         $(e.target)
           .parent("div.review-content1")
           .find("#reviewTextBox")
           .is(":visible")
       ) {
          $(e.target)
            .parent("div.review-content1")
            .find("#reviewTextBox")
            .hide();
       }
       
       else {
          $(e.target)
            .parent("div.review-content1")
            .find("#reviewTextBox")
            .show();
       }
       
    })
     //--자세히 보기 버튼 END--
})