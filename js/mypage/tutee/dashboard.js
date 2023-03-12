$(() => {
    userCheckIntervalLogined()
    //=== 모든 수업 목록 보여주기 START ===
    let url = backURL + 'mypage/tutee';
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)

            //승인 예정 수업
            let $parent = $('div.dash-box');
            let $origin = $('#applyWaitList').first();
            $(jsonObj.applyWaitList).each((i) => {

                if (jsonObj.applyWaitList[i].lessonName != null) {
                    let $copy = $origin.clone();
                    $copy.find('div.lastLsit-lessonName').html(jsonObj.applyWaitList[i].lessonName)
                    $parent.append($copy);
                    $origin.hide();
                } else {
                    $('#applyWaitList>div.lastLsit-lessonName').hide();
                }

            })

            //진행 예정 수업
            $origin = $('#notYetList').first();
            $(jsonObj.notYetList).each((i) => {
                if (jsonObj.notYetList[i].lessonName != null) {
                    let $copy = $origin.clone();
                    $copy.find('div.lastLsit-lessonName').html(jsonObj.notYetList[i].lessonName)
                    $parent.append($copy);
                    $origin.hide();
                } else {
                    $('#notYetList>div.lastLsit-lessonName').hide();
                }
            })

            //승인 거절 수업
            $origin = $('#rejectList').first();
            $(jsonObj.rejectList).each((i) => {
                if (jsonObj.rejectList[i].lessonName != null) {
                    let $copy = $origin.clone();
                    $copy.find('div.lastLsit-lessonName').html(jsonObj.rejectList[i].lessonName)
                    $parent.append($copy);
                    $origin.hide();
                } else {
                    $('#rejectList>div.lastLsit-lessonName').hide();
                }
            })

            //진행 중인 수업
            $origin = $('#proceedingList').first();
            $(jsonObj.proceedingList).each((i) => {
                if (jsonObj.proceedingList[i].lessonName != null) {
                    let $copy = $origin.clone();
                    $copy.find('div.lastLsit-lessonName').html(jsonObj.proceedingList[i].lessonName)
                    $parent.append($copy);
                    $origin.hide();
                } else {
                    $('#proceedingList>div.lastLsit-lessonName').css('display','none');
                }
            })

            //진행 완료된 수업 
            $origin = $('#lastList').first();
            $(jsonObj.lastList).each((i) => {
                if (jsonObj.lastList[i].lessonName != null) {
                    let $copy = $origin.clone();
                    $copy.find('div.lastLsit-lessonName').html(jsonObj.lastList[i].lessonName)
                    $parent.append($copy);
                    $origin.hide();
                } else {
                    $('#lastList>div.lastLsit-lessonName').hide();
                }
            })



        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 모든 수업 목록 보여주기 END ===


    //===  수업 제목 누르면 해당 수업 상세정보로 이동  START ===
    $("div.lesson-list").on('click', 'div.lesson', (e) => {
        let lessonSeq = $(e.target).parents('div.lesson').find('div.lessonSeq').html();
        location.href = frontURL + 'admin/lesson/detail.html?' + lessonSeq;
    })
    //===  수업 제목 누르면 해당 수업 상세정보로 이동  END ===
});

