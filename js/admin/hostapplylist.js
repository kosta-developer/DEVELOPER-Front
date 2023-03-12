$(() => {
    userCheckIntervalLogined();

    //=================[호스트 미승인 목록 출력 START]==================
    let url = backURL + 'admin/host/unapprove'
    let $origin = $('div.apply-list-host-origin').first()
    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.apply-list-host');

            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()
                $copy.find('span#host-hostId').html(item.hostId)
                $copy.find('span#host-email').html(item.email)
                $copy.find('span#host-tel').html(item.tel)

                $parent.append($copy)
            })
            $origin.hide()

        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
    //=================[호스트 미승인 목록 출력 END]==================



    //=================[호스트 승인 거절 버튼 클릭 시 START]==================

    function confirmModalHostReject(e) {
        let confirm = window.confirm("호스트 승인을 거절하시겠습니까?");

        if (confirm == true) {
            //확인버튼 클릭 시 
            let hostId = $(e.target).parents('div.apply-list-host-origin').find('span#host-hostId').html();

            let url2 = backURL + 'admin/host/unapprove/' + hostId
            $.ajax({
                xhrFields: {
                    withCredentials: true //크로스오리진을 허용!
                },
                method: 'post',
                url: url2,
                success: function () {
                    alert('승인이 거절되었습니다')
                    location.href = frontURL + 'admin/hostapplylist.html'
                },
                error: function (xhr) {
                    alert(xhr.status)
                }
            })
        } else if (confirm == false) {
            //취소 버튼 클릭 시
            self.opener = self;
            window.close;
        }
    }

    $(document).on('click', 'input#hostReject', (e) => {
        confirmModalHostReject(e)
    })

    //=================[튜터 승인 거절 버튼 클릭 시 END]==================



//=================[호스트 승인 버튼 클릭 시 START]==================

function confirmModalHostOk(e) {
    let confirm = window.confirm("호스트 승인을 하시겠습니까?");

    if (confirm == true) {
        //확인버튼 클릭 시 
        let hostId = $(e.target).parents('div.apply-list-host-origin').find('span#host-hostId').html();

        let url2 = backURL + 'admin/host/unapprove/' + hostId
        $.ajax({
            xhrFields: {
                withCredentials: true //크로스오리진을 허용!
            },
            method: 'put',
            url: url2,
            success: function () {
                alert('승인이 완료되었습니다')
                location.href = frontURL + 'admin/hostapplylist.html'
            },
            error: function (xhr) {
                alert(xhr.status)
            }
        })
    } else if (confirm == false) {
        //취소 버튼 클릭 시
        self.opener = self;
        window.close;
    }
}

$(document).on('click', 'input#hostOk', (e) => {
    confirmModalHostOk(e)
})

//=================[호스트 승인 버튼 클릭 시 END]==================


})
