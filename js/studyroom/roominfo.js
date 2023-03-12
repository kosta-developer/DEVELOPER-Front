$(()=>{
   
    let url = backURL+'studyroom/roominfo/'
    let seq = location.search.substring(1) 
    let url2 = backURL+"favoritesstudyroom/add/"+seq //추가
    let url3 = backURL+"favoritesstudyroom/check"
    

    let openTime=""
    let endTime=""

    var favSeq = "";
    var srSeq = "";


    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url+seq,
        method:"GET",

        success: function(jsonObj){
            
            //--스터디카페 상세정보 출력 START--
            let $head = $('div.content-container>div.studycafeInfo>div.studycafeDetail').first()

            $(jsonObj).each((index,d)=>{
                let  cfName = d.studyroomDTO.name;
                let  imgPath =d.studyroomDTO.imgPath;
                let  info =d.studyroomDTO.info;
                let  addr=d.studyroomDTO.addr;
                openTime=d.studyroomDTO.openTime;
                endTime=d.studyroomDTO.endTime;

                let $imgObj=$('<img id="cafeimg">') 
                $imgObj.attr('src', '../../images/' + imgPath+ '.jpeg')
                $head.find(".img").html($imgObj)
                $head.find(".cfName").html(cfName);
                $head.find(".info").html(info);
                $head.find(".addr").html(addr);
                $head.find(".openTime").html("오픈시간: "+openTime);
                $head.find(".endTime").html("마감시간: "+endTime);
                
            }) 
            
        }, error:function(xhr){
            alert(xhr.responseText)
        } 
        
    })
    //--스터디카페 상세정보 출력 END--
    //--스터디룸 리스트 출력 START--
     $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url+seq,
        method:"GET",
        success: function(jsonObj){
            let $origin = $('div.content-container>div.studycafeInfo>div.studyroomList').first()
             let $parent = $origin.parent()

            $(jsonObj.roominfoDTO).each((index,a)=>{
                let roomSeq = a.roomSeq;
                let roomName = a.name;
                let roomInfo = a.info;
                let imgPath = a.imgPath;
                let person = a.person;
                let roomPrice = a.price;
                let hostId =a.studyroomDTO.hostIdDTO.hostId;
                
                let $copy=$origin.clone()

                let $imgObj=$('<img id="roomimg">') 
                $imgObj.attr('src', '../../images/' + imgPath+ '.jpeg')
                $copy.find(".roomImg").html($imgObj)
                $copy.find(".roomSeq").html(roomSeq)
                $copy.find(".hostId").html(hostId)
                $copy.find(".roomName").html(roomName)
                $copy.find(".roomInfo").html(roomInfo)
                $copy.find(".person").html("최대 인원: "+person+"명")
                $copy.find(".roomPrice").html("시간 당: "+roomPrice+"원")
                 $copy.find(".locationbtn").html('<input type="button" onclick="location.href='+"'"+frontURL+'studyroom/reservation.html?'+roomSeq+"&"+hostId+"&"+roomPrice+"&"+openTime+"&"+endTime+"'"+'" value="예약하기" class="resbtn" >')
                
                $parent.append($copy)
            })
          $origin.hide()
        }
    })
    //--스터디룸 리스트 출력 END--
    
    //--스터디카페 후기리스트 출력 START--
     $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url+seq,
        method:"GET",
        success: function(jsonObj){
            let $origin2 = $('div.content-container>div.studycafeInfo>div.roomReview').first()
            let $parent2= $origin2.parent()
            $(jsonObj.roomReviewSelectAllDTO).each((index,r)=>{
                
                let cdate = r.cdate;
                let nickname=r.rrsaDTO.userNickNameDTO.nickname;
                let rmname=r.rrsaDTO.roomInfoNameDTO.name;
                let star=r.star;
                let content=r.content;

                let $copy2=$origin2.clone()
                
                $copy2.find(".usingDate").html(cdate)
                $copy2.find(".nickname").html(nickname)
                $copy2.find(".rmname").html(rmname)
                let starcnt=""   
                for (i = 0; i<= star ; i++){

                    starcnt="🌟".repeat(i+1);

                    }   
                $copy2.find(".star").html(starcnt)
                $copy2.find(".content").html(content)
                $parent2.append($copy2)
            })
            $origin2.hide()
        }
    })
    //--스터디카페 후기리스트 출력 END--
    
    //--즐겨찾기 버튼 클릭 START--
     $('.favStudy').click(()=>{
       //--즐겨찾기 이미 추가한 상태인지 확인 START-- //즐겨찾기 db에 내역이 완전히 없는 상태이면 에러코드로 넘어감 -> 이럴경우 즐겨찾기 추가실행(하... 왜 중복추가되는거지..)
      var fav=""
      // try{

          $.ajax({
            xhrFields: {
              withCredentials: true,
            },
            url: url3,
            method: "GET",
            success: function (jsonObj) {
                    
   
                  $(jsonObj).each((index, r) => {
                   
                    
                    srSeq = r.srseqDTO.srSeq;
                   if(srSeq ==seq)
                  // break
                  $("#nonebox2").html(srSeq);
                       
                  
                  });

                   if (srSeq == seq) {
                     //--- 즐겨찾기 추가-----
                     $.ajax({
                       xhrFields: {
                         withCredentials: true,
                       },
                       url: backURL + "favoritesstudyroom/" + seq,
                       method: "DELETE",
                       success: function (jsonObj) {
                         alert("즐겨찾기를 삭제하셨습니다");
                       },
                     });
                   } else {
                     $.ajax({
                       xhrFields: {
                         withCredentials: true,
                       },
                       url: url2,
                       method: "POST",
                       success: function (jsonObj) {
                         alert("즐겨찾기에 추가하셨습니다");
                       },
                     });
                   }
              
            },
            error: function (xhr) {
             
           
            },
          });
      // }catch(e){
      //   $.ajax({
      //     xhrFields: {
      //       withCredentials: true,
      //     },
      //     url: url2,
      //     method: "POST",
      //     success: function (jsonObj) {
      //       alert("즐겨찾기에 추가하셨습니다");
      //     },
      //   });
      // }
       
     })
    //--즐겨찾기 버튼 클릭 END--

    
})