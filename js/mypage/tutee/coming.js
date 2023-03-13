$(()=>{
    userCheckIntervalLogined();
    let url = backURL+'mypage/tutee/upcoming';
    // let url = 'http://172.30.1.15:8888/developer/mypage/tutor';

    function coming() {
    $.ajax({
        xhrFields: {
        withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: "GET",
        headers : { "Content-Type" : "application/json"},
        success: function(jsonObj){
            console.log(jsonObj)
            let $origin = $('#classlist').first();
            let $parent = $('#comingClass');
            $(jsonObj).each((i)=>{
                let $copy = $origin.clone();
                $copy.find('div.lessonName').html("<h4>" + jsonObj[i].applyList.lessonName + "</h4>")
                $copy.find('div.lessonSeq').html(jsonObj[i].applyList.lessonSeq)

                $parent.append($copy);
            })
            // console.log('이거는'+jsonObj[i].applyList)
            $origin.hide();

            $(document).on('click','div.lessonName', (e)=>{
                // let unpaidlessonSeq = $(e.target).html()
                let lessonSeq = $(e.currentTarget).parent().find('div.lessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                // location.href = frontURL + 'admin/host/detail/'+hostId
                location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
            })


            // 결제가 필요한 수업 END


            // // 진행 예정 수업 START
            // let $origin2 = $('#classlist2').first();
            // let $parent2 = $('#notyetClass');

            // $(jsonObj).each((index)=>{
            //     let $copy2 = $origin2.clone();
            //     $copy2.find('div.notyetlessonName').html("<h4>" + jsonObj[index].notYetList.lessonName + "</h4>")
            //     $copy2.find('div.notyetlessonSeq').html(jsonObj[index].notYetList.lessonSeq)
            //     $parent2.append($copy);
            // })
            // $origin2.hide();

            // $(document).on('click','div.notyetlessonName', (e)=>{
            //     let lessonSeq = $(e.currentTarget).parent().find('div.notyetlessonSeq').html()
            //     console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
            //     location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
            //     // location.href = 'http://172.30.1.15:5500/html/mypage/tutor/comingdetail.html?lessonSeq=' + lessonSeq;
            // })

            // // 진행 예정 수업 END
            },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });

    }
        coming();

});