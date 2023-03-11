let roomSeq = document.location.href.split("=")[1];

$(() => {
    hostCheckIntervalLogined()
    let url = backURL + 'host/roominfo/list'
    let $origin = $('div.room-list-origin').first()

    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.room-list');

            $(jsonObj).each((index) => {
                let $copy = $origin.clone()

                let imgPath = jsonObj[index].imgPath
                console.log(imgPath)

                //--썸네일 이미지 다운로드 START--
                $.ajax({
                    xhrFields: {
                        responseType: "blob",
                    },
                    cashe: false,
                    url: backURL + "download/roominfo",
                    method: "get",
                    data: "imgPath=" + imgPath + "&opt=inline&type=1",
                    success: function (result) {
                        console.log(result);
                        let blobStr = URL.createObjectURL(result);
                        $copy.find("a>img").attr("src", blobStr);
                        //console.log('틀렸나?'+$copy_lesson.find("div.lessonlistorigin>a").html())
                        //console.log('틀렸나first?'+$copy_lesson.find("div.lessonlistorigin>a>img").first())
                    },
                });
                //--썸네일 이미지 다운로드 END--

                //let roomSeq = jsonObj[index].roomSeq;
                //console.log('roomSeq: ' + roomSeq);
                //localStorage.setItem("roomSeq", roomSeq);

                $copy.find('div#room-seq').html(jsonObj[index].roomSeq) //우선 display:hidden
                $copy.find('div#room-name').html('룸 이름: ' + jsonObj[index].name)
                $copy.find('div#room-price').html('시간당 가격: ' + jsonObj[index].price + '원')
                $copy.find('div#room-person').html('인원: ' + jsonObj[index].person + '명')
                //동수님을 위한 값넘겨주기
                $copy.find('div#room-openTime').html(jsonObj[index].studyroomTimeDTO.openTime)
                $copy.find('div#room-endTime').html(jsonObj[index].studyroomTimeDTO.endTime)
                
                $copy.append('<input type="button" value= "수정" class="room-info-btn-edit">')
                $copy.append('<input type="button" value= "예약" class="room-info-btn-reservation">')

                $parent.append($copy)
            })
            $origin.hide()

        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })


})


//$(e.target).parents('div.room-list-origin').find('div#room-seq').text();

//----룸 정보 수정 클릭 시 START----
$(document).on('click', 'input.room-info-btn-edit', (e) => {
    // let roomSeq = $('div.room-list-origin>div#room-seq').text()
    let roomSeq = $(e.target).parents('div.room-list-origin').find('div#room-seq').text();
    console.log(roomSeq)
    location.href = frontURL + 'host/editroom.html?roomSeq=' + roomSeq
    //location.href = frontURL + 'host/editroom.html'
})
//----룸 정보 수정 클릭 시 END----


//----예약 클릭 시 START----
$(document).on('click', 'input.room-info-btn-reservation', (e) => {
    // let roomSeq = $('div.room-list-origin>div#room-seq').text()
    let roomSeq = $(e.target).parents('div.room-list-origin').find('div#room-seq').text();
    let openTime = $(e.target).parents('div.room-list-origin').find('div#room-openTime').text();
    let endTime = $(e.target).parents('div.room-list-origin').find('div#room-endTime').text();
    console.log(roomSeq)
    console.log(openTime)
    console.log(endTime)

    location.href = frontURL + 'host/hostreservation.html?roomSeq=' + roomSeq +'&openTime='+ openTime +'&endTime='+ endTime
    //location.href = frontURL + 'host/editroom.html'
})
//----예약 클릭 클릭 시 END----
