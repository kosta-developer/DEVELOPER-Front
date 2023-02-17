let roomSeq = document.location.href.split("?")[1];
$(() => {
    let url = backURL + 'studyroom/listroom'
    let $origin = $('div.room-list-origin').first()

    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        data: 'hostId=suho522',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.room-list');

            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()
                let $imgObj = $('<img id="room-img">')
                $imgObj.attr('src', '/images/studycafe.png')
                $copy.find('div.room-img-div').empty().append($imgObj)
                $copy.find('div#room-seq').html(item.roomSeq) //우선 display:hidden
                $copy.find('div#room-name').html('룸 이름: ' + item.name)
                $copy.find('div#room-price').html('시간당 가격: ' + item.price + '원')
                $copy.find('div#room-person').html('인원: ' + item.person + '명')
                $copy.append('<input type="button" value= "수정" id="room-info-btn-edit" class="room-info-btn">')
                $copy.append('<input type="button" value= "예약" id="room-info-btn-reservation"class="room-info-btn">')

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
$(document).on('click','#room-info-btn-edit', (e)=>{
    // let roomSeq = $('div.room-list-origin>div#room-seq').text()
    let roomSeq = $(e.target).parents('div.room-list-origin').find('div#room-seq').text();
    console.log(roomSeq)
    location.href = frontURL + 'roominfo/editRoom.html?roomSeq='+roomSeq
})
//----룸 정보 수정 클릭 시 END----
