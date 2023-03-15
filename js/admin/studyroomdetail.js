let url = new URL(location.href);
let seq = url.searchParams.get("srSeq");
let srSeq = Number(seq);

$(()=>{
    userCheckIntervalLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));
    let $origin_studyroomDetail= $('div#studyroomDetail').first()
    let $parent_studyDetail = $('div.studyDetail');

    let $origin_reservationList = $('div#reservationList');
    let $parent_reservation = $('div.reservation');
    $origin_studyroomDetail.show()
    $origin_reservationList.show()
    
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url:backURL+'admin/studyroom/detail/'+srSeq,
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(res) =>{
            if (res.s.oc== 0) {
                temp = "운영여부 : 운영중";
            } else if (res.s.oc == 1) {
                temp = "운영여부 : 마감";
            }
            let $img = $('.content-container>.studyDetail>#studyroomDetail>div.imgPath');
                //--썸네일 이미지 다운로드 START--
                $.ajax({
                    xhrFields: {
                        responseType: "blob",
                    },
                    cache: false,
                    url: backURL + "download/admin/studyroom",
                    method: "get",
                    data: "imgPath=" + res.s.imgPath + "&opt=inline&type=1",
                    success: function (result) {
                        console.log(result);
                        let blobStr = URL.createObjectURL(result);
                        $img.find("img").attr("src", blobStr);
                    },
                });

            console.log(res);
                let $copy_studyroomDetail = $origin_studyroomDetail.clone();
                $copy_studyroomDetail.find('div.name').html(res.s.name)
                $copy_studyroomDetail.find('div.addr').html(res.s.addr)
                $copy_studyroomDetail.find('div.info').html(res.s.info)
                $copy_studyroomDetail.find('div.open_time').html("오픈시간: "+res.s.openTime)
                $copy_studyroomDetail.find('div.end_time').html("종료시간: "+res.s.endTime)
                $copy_studyroomDetail.find('div.imgPath').html(res.s.imgPath)
                $copy_studyroomDetail.find('div.oc').html(temp)
                $copy_studyroomDetail.find('div.srSeq').html(res.s.srSeq)
                $parent_studyDetail.append($copy_studyroomDetail)
                
                
                $origin_studyroomDetail.hide();

                if (res.reservationDTO == null) {
                    $parent_reservation.append("예약내역이 없습니다.");
                    $origin_reservationList.hide();
                } 
                $(res.reservationDTO).each((index)=>{
                let $copy_reservationList = $origin_reservationList.clone();
                $copy_reservationList.find('div.rname').html("방이름: "+ res.reservationDTO[index].name);
                $copy_reservationList.find('div.startTime').html("예약 시작시간 : "+ res.reservationDTO[index].reservation.startTime);
                $copy_reservationList.find('div.endTime').html("예약 종료시간 : "+ res.reservationDTO[index].reservation.endTime);
                $copy_reservationList.find('div.nickname').html("예약자: "+ res.reservationDTO[index].users.nickname);
                $copy_reservationList.find('div.usingDate').html("예약일: "+ res.reservationDTO[index].users.usingDate);
                $parent_reservation.append($copy_reservationList);
                $origin_reservationList.hide();
                })

                
        },
        error : function(xhr){
            alert(xhr.status);
        }
    })

})
