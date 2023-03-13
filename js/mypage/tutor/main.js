$(()=>{
    userCheckIntervalLogined();
    let url = backURL+'mypage/tutor';
    // let url = 'http://172.30.1.15:8888/developer/mypage/tutor';

    function coming() {
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        method: "GET",
        headers : { "Content-Type" : "application/json"},
        url: url,
        success: function(jsonObj){
            console.log(jsonObj)
            console.log(jsonObj.list2)

            // 결제가 필요한 수업 START
            let $origin4 = $('#unpaidclasslist').first();
            let $parent4 = $('#unpaidClass');
            $(jsonObj.list4).each((index, item)=>{
                let $copy4 = $origin4.clone();
                $copy4.find('div.unpaidlessonName').html("<h4>" + item.lessonName + "</h4>")
                $copy4.find('div.unpaidlessonSeq').html(item.lessonSeq)
                $parent4.append($copy4);
                
            })
            $origin4.hide();

            $(document).on('click','div.unpaidlessonName', (e)=>{
                let lessonSeq = $(e.currentTarget).parent().find('div.unpaidlessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                location.href = frontURL + 'mypage/tutor/order.html?lessonSeq=' + lessonSeq;
                // location.href = 'http://172.30.1.15:5500/html/mypage/tutor/order.html?lessonSeq=' + lessonSeq;
            })


            // 결제가 필요한 수업 END


            // 진행 예정 수업 START
            let $origin = $('#comingclasslist').first();
            let $parent = $('#comingClass');

            $(jsonObj.list).each((index, item)=>{
                let $copy = $origin.clone();
                $copy.find('div.cominglessonName').html("<h4>" + item.lessonName + "</h4>")
                $copy.find('div.cominglessonSeq').html(item.lessonSeq)
                $parent.append($copy);
            })
            $origin.hide();

            $(document).on('click','div.cominglessonName', (e)=>{
                let lessonSeq = $(e.currentTarget).parent().find('div.cominglessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                location.href = frontURL + '/mypage/tutor/comingdetail.html?lessonSeq=' + lessonSeq;
                // location.href = 'http://172.30.1.15:5500/html/mypage/tutor/comingdetail.html?lessonSeq=' + lessonSeq;
            })

            // 진행 예정 수업 END


            // 진행중인 수업 START

            let $origin2 = $('#ongoingclasslist').first();
            let $parent2 = $('#ongoingClass');
            $(jsonObj.list2).each((index, item)=>{
                let $copy2 = $origin2.clone();
                $copy2.find('div.ongoinglessonName').html("<h4>" + item.lessonName + "</h4>")
                $copy2.find('div.ongoinglessonSeq').html(item.lessonSeq)
                $parent2.append($copy2);
            })
            $origin2.hide();

            $(document).on('click','div.ongoinglessonName', (e)=>{
                // let unpaidlessonSeq = $(e.target).html()
                let lessonSeq = $(e.currentTarget).parent().find('div.ongoinglessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                location.href = frontURL + 'mypage/tutor/ongoingdetail.html?lessonSeq=' + lessonSeq;
                // location.href = 'http://172.30.1.15:5500/html/mypage/tutor/ongoingdetail.html?lessonSeq=' + lessonSeq;
            })
            // 진행중인 수업 END

            
            // 진행완료 수업 START
            let $origin3 = $('#completedclasslist').first();
            let $parent3 = $('#completedClass');
            $(jsonObj.list3).each((index, item)=>{
                let $copy3 = $origin3.clone();
                $copy3.find('div.completedlessonName').html("<h4>" + item.lessonName + "</h4>")
                $copy3.find('div.completedlessonSeq').html(item.lessonSeq)
                $parent3.append($copy3);
            })
            $origin3.hide();

            $(document).on('click','div.completedlessonName', (e)=>{
                // let unpaidlessonSeq = $(e.target).html()
                let lessonSeq = $(e.currentTarget).parent().find('div.completedlessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                location.href = frontURL + 'mypage/tutor/completeddetail.html?lessonSeq=' + lessonSeq;
                // location.href = 'http://172.30.1.15:5500/html/mypage/tutor/completeddetail.html?lessonSeq=' + lessonSeq;
            })
            // 진행중인 수업 END


        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });

    }
        coming();

});