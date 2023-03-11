let url = backURL + 'host/reservation/info/';
let resSeq = document.location.href.split("=")[1];
$(() => {
    hostCheckIntervalLogined()
    let $origin = $('div.reservation-list-origin').first()


    $origin.show()

    //-----정보출력 START--------
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url + resSeq,
        method: 'get',
        success: function (list) {
            console.log(list)
            let $parent = $('div.reservation-list');

            $(list).each((index, item) => {
                let $copy = $origin.clone()
               
                $copy.find('div#reservation-seq').html(item.resSeq)
                if (!item.userId) {
                    $copy.find('div#reservation-name').html(item.hostId)
                }
                $copy.find('div#reservation-name').html(item.usersDTO.name)
                $copy.find('div#reservation-hp').html(item.usersDTO.tel)
                $copy.find('div#reservation-roomName').html(item.roomInfoDTO.name)
                $copy.find('div#reservation-usingDate').html(item.usingDate)
                $copy.find('div#reservation-startTime').html(item.startTime)
                $copy.find('div#reservation-endTime').html(item.endTime)
                $parent.append($copy)
            })
            $origin.hide()
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })

    //-----정보출력 END--------


    //--목록으로 돌아가기 버튼 클릭 시 할일 START--
    $('#content-wrap > div > div.content-container > div.detail-content-box > div.sub-title > input[type=button]').click((e) => {
        location.href = frontURL + 'host/listreservation.html'
    })
    //--목록으로 돌아가기 버튼 클릭 시 할일 END--


    //--예약 취소버튼 클릭 시 할일 START--
    function confirmModal() {
        let confirm = window.confirm("정말 삭제하시겠습니까?");

        if (confirm == true) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: backURL + 'host/reservation/info/' + resSeq,
                method: 'delete',
                success: function (result) {
                    console.log(result);
                    alert('해당 예약건이 취소되었습니다.')
                    location.href = frontURL + 'host/listreservation.html'
                },
                error: function (xhr) {
                    alert(xhr.status)
                }
            })
        } else if (confirm == false) {
            self.opener = self;
            window.close;
        }
    }


    $(document).on('click','#delreservation', (e)=>{
        confirmModal()
    })

    //--취소버튼 클릭 시 할일 END--

})


