$(()=>{
  userCheckLogined()
  let logined = sessionStorage.getItem("logined");
   $('span#showLoginId').html(sessionStorage.getItem("logined"));
    let url = backURL+'studyroom/roominfo/'
    let seq = location.search.substring(1) 
    let url2 = backURL+"favoritesstudyroom/add/"+seq //즐겨찾기추가
    let url3 = backURL+"favoritesstudyroom/check" //즐겨찾기 상태확인
    

    let openTime;
    let endTime;
    var favStatus;
    var favSeq;
    var srSeq;


    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url+seq,
        method:"GET",

        success: function(jsonObj){
               //이미 즐겨찾기한 사용자라면 버튼 색 바꾸기
            $(jsonObj.studyroomAndFavStuyroomInfoDTO.favoritesStudyroomDTO).each((i)=>{
              if(jsonObj.studyroomAndFavStuyroomInfoDTO.favoritesStudyroomDTO[i].userId == logined){
                let abc=jsonObj.studyroomAndFavStuyroomInfoDTO.favoritesStudyroomDTO[i].userId;
                
                $('.favStudy').css('backgroundColor', 'yellow');
                
                favSeq=jsonObj.studyroomAndFavStuyroomInfoDTO.favoritesStudyroomDTO[i].favSeq;
                console.log(favSeq)
                favStatus = 0; //즐겨찾기 있으면 0
              }else{
                console.log("야")
                favStatus = 1; //즐겨찾기 없으면 1
              }
            }) 

            //--스터디카페 상세정보 출력 START--
            let $head = $('div.studycafeDetail').first()

            $(jsonObj).each((index,d)=>{
                let  cfName = d.studyroomAndFavStuyroomInfoDTO.name;
                let  imgPath =d.studyroomAndFavStuyroomInfoDTO.imgPath;
                let  info =d.studyroomAndFavStuyroomInfoDTO.info;
                let  addr=d.studyroomAndFavStuyroomInfoDTO.addr;
                openTime=d.studyroomAndFavStuyroomInfoDTO.openTime;
                endTime=d.studyroomAndFavStuyroomInfoDTO.endTime;

                let $imgObj=$('<img id="cafeimg">') 
                $imgObj.attr('src', '../../images/' + imgPath)
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
            let $origin = $('div.studyroomList').first()
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
                $imgObj.attr('src', '../../images/' + imgPath)
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
            let $origin2 = $('div.roomReview').first()
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
       //--즐겨찾기 삭제 START--
       alert(favStatus)
     if(favStatus == 0){
        $.ajax({
            xhrFields: {
                    withCredentials: true
            },
            method: 'delete',
            url: backURL + "favoritesstudyroom/" + seq,
            success: function(){
               $('.favStudy').css('backgroundColor', 'greenyellow');
               alert("즐겨찾기 삭제");
            },
            error: function (xhr) {
                    let jsonObj = JSON.parse(xhr.responseText);
                    alert(jsonObj.msg);
            }
             
          })
      } else {
        //--즐겨찾기 추가 START--
          $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: url2,
                method: "POST",
                success: function () {
                $('.favStudy').css('backgroundColor', 'yellow');
                alert("즐겨찾기 등록");
                },
                error: function (xhr) {
                    let jsonObj = JSON.parse(xhr.responseText);
                    alert(jsonObj.msg);
                }
            });
             //--즐겨찾기 추가 START--
      }
    })
    //--즐겨찾기 버튼 클릭 END--

    
})