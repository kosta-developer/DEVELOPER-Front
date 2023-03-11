$(() => {
    hostCheckIntervalLogined()

    $('div.side-container>div.menu>div>ul>li.roomList').click((e) => {
        location.href = frontURL + 'host/listroom.html'
    })

    //=================[호스트 유저 정보 & 스터디카페 정보 출력 START]==================
    let url = backURL + 'host/'

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {

            console.log(jsonObj)
            let $hostInfo = $('#host-infomation-box');
            $hostInfo.find('div#business-number').html(jsonObj.hostUserDTO.hostID)
            $hostInfo.find('div#business-number').html(jsonObj.hostUserDTO.num)
            $hostInfo.find('div#business-name').html(jsonObj.hostUserDTO.name)
            $hostInfo.find('div#business-hp').html(jsonObj.hostUserDTO.tel)
            $hostInfo.find('div#business-email').html(jsonObj.hostUserDTO.email)

            let $studycafeInfo = $('#studycafe-infomation-box');
            $studycafeInfo.find('div#studycafe-seq').html(jsonObj.srSeq)
            $studycafeInfo.find('div#studycafe-name').html(jsonObj.name)
            $studycafeInfo.find('div#studycafe-address').html(jsonObj.addr)
            $studycafeInfo.find('div#studycafe-open-time').html(jsonObj.openTime)
            $studycafeInfo.find('div#studycafe-end-time').html(jsonObj.endTime)
            if (jsonObj.oc == 0) {
                $studycafeInfo.find('div#studycafe-oc').html('영업중')
            } else if (jsonObj.oc == 1) {
                $studycafeInfo.find('div#studycafe-oc').html('영업종료')
            }

            let srSeq = $('div#studycafe-seq').html();
            console.log('srSeq: ' + srSeq);
            localStorage.setItem("srSeq", srSeq);

            //=================[이미지 다운로드 START]==================
            let imgPath = jsonObj.imgPath

            $.ajax({
                xhrFields: {
                    responseType: "blob",
                },
                cashe: false,
                url: backURL + "download/studyroom",
                method: "get",
                data: "imgPath=" + imgPath + "&opt=inline&type=1",
                success: function (result) {
                    let blobStr = URL.createObjectURL(result);
                    $studycafeInfo.find("div.imgbox>img").attr("src", blobStr);
                },
            });
            //=================[이미지 다운로드 END]==================

        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })

    //=================[호스트 유저 정보 & 스터디카페 정보 출력 END]==================





    //=================[회원 정보 수정버튼 클릭 START]==================
    $('#host-infomation-box > div:nth-child(9) > input[type=button]').click((e) => {
        location.href = frontURL + 'host/edithost.html'
    })
    //=================[회원 정보 수정버튼 클릭 END]==================




    //=================[카페 정보 수정버튼 클릭 START]==================
    $('#studycafe-infomation-box > div.textbox > div:nth-child(14) > input[type=button]').click((e) => {
        location.href = frontURL + 'host/editstudycafe.html'
    })
    //=================[카페 정보 수정버튼 클릭 END]==================




    //=================[영업 시작 버튼 클릭 START]==================


    function confirmModalOpen(e) {
        let confirm = window.confirm("영업을 시작하시겠습니까?");

        if (confirm == true) {
            //확인버튼 클릭 시 
            let srSeq = $(e.target).parents('div.textbox').find('div#studycafe-seq').text();

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: backURL + 'host/open/' + srSeq,
                method: 'put',
                success: function (result) {
                    alert('영업을 시작하여 예약기능 활성화되었습니다.')
                },
            });
        } else if (confirm == false) {
            //취소 버튼 클릭 시
            self.opener = self;
            window.close;
        }
    }

    $(document).on('click', '#studycafe-infomation-box > div.textbox > div.time-button> input#ocOpen', (e) => {
        confirmModalOpen(e)
    })

    //=================[영업 시작 버튼 클릭 END]==================



    
    //=================[영업 종료 버튼 클릭 START]==================


    function confirmModalClose(e) {
        let confirm = window.confirm("영업을 종료하시겠습니까?");

        if (confirm == true) {
            //확인버튼 클릭 시 
            let srSeq = $(e.target).parents('div.textbox').find('div#studycafe-seq').text();

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },

                url: backURL + 'host/close/' + srSeq,
                method: 'put',
                success: function (result) {
                    alert('영업을 종료하여 예약기능 비활성화되었습니다.')
                },
            });
        } else if (confirm == false) {
            //취소 버튼 클릭 시
            self.opener = self;
            window.close;
        }
    }

    $(document).on('click', '#studycafe-infomation-box > div.textbox > div.time-button> input#ocClose', (e) => {
        confirmModalClose(e)
    })


    //=================[영업 종료 버튼 클릭 END]==================




    //=================[룸 추가 버튼 클릭 START]==================
    $('#add-room-btn').click((e) => {
        location.href = frontURL + 'host/addroom.html'
    });
    //=================[룸 추가 버튼 클릭 END]==================

})


