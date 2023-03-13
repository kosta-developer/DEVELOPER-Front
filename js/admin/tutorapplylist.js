$(() => {

    userCheckIntervalLogined();


    //=================[튜터 미승인 목록 출력 START]==================
    let item;
    let url = backURL + 'admin/users/tutor'
    let $origin = $('div.apply-list-tutor-origin').first()
    $origin.show()

    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.apply-list-tutor');

            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()

                $copy.find('span.tutor-userId').html(item.userId)
                $copy.find('span.tutor-tel').html(item.tel)
                $copy.find('span.tutor-email').html(item.email)

                $parent.append($copy)
            })
            $origin.hide()

        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
    //=================[튜터 미승인 목록 출력 END]==================



    //=================[튜터 승인 거절 버튼 클릭 시 START]==================

    function confirmModalTutorReject(e) {
        let confirm = window.confirm("튜터 승인을 거절하시겠습니까?");

        if (confirm == true) {
            //확인버튼 클릭 시 
            let userId = $(e.target).parents('div.apply-list-tutor-origin').find('span.tutor-userId').html();
            let url2 = backURL + 'admin/users/tutor/' + userId
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: 'post',
                url: url2,
                success: function () {
                    alert('승인을 거절하였습니다')
                    location.href = frontURL + 'admin/tutorapplylist.html'
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

    $(document).on('click', 'input.approve-btn-reject', (e) => {
        confirmModalTutorReject(e)
    })

    //=================[튜터 승인 거절 버튼 클릭 시 END]==================




    //=================[튜터 승인 버튼 클릭 시 START]==================

    function confirmModalTutorOk(e) {
        let confirm = window.confirm("튜터 승인을 하시겠습니까?");

        if (confirm == true) {
            //확인버튼 클릭 시 
            let userId = $(e.target).parents('div.apply-list-tutor-origin').find('span.tutor-userId').html();
            let url2 = backURL + 'admin/users/tutor/' + userId
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: 'put',
                url: url2,
                success: function () {
                    alert('승인이 완료되었습니다')
                    location.href = frontURL + 'admin/tutorapplylist.html'
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

    $(document).on('click', 'input.approve-btn-ok', (e) => {
        confirmModalTutorOk(e)
    })

    //=================[튜터 승인 버튼 클릭 시 END]==================

})
