$(()=>{
    userCheckIntervalLogined();
    // let url = backURL+'mypage/tutor';
    let url = 'http://172.30.1.15:8888/developer/mypage/tutor';

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
                // let unpaidlessonSeq = $(e.target).html()
                let lessonSeq = $(e.currentTarget).parent().find('div.unpaidlessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                // location.href = frontURL + 'admin/host/detail/'+hostId
                location.href = 'http://172.30.1.15:5500/html/mypage/tutor/order.html?lessonSeq=' + lessonSeq;
            })


            // 결제가 필요한 수업 END



            let $origin = $('#comingclasslist').first();
            let $parent = $('#comingClass');

            $(jsonObj.list).each((index, item)=>{
                let $copy = $origin.clone();
                $copy.find('div.cominglessonName').html("<h4>" + item.lessonName + "</h4>")
                $parent.append($copy);
            })
            $origin.hide();


            let $origin2 = $('#ongoingclasslist').first();
            let $parent2 = $('#ongoingClass');
            $(jsonObj.list2).each((index, item)=>{
                let $copy2 = $origin2.clone();
                $copy2.find('div.ongoinglessonName').html("<h4>" + item.lessonName + "</h4>")
                $parent2.append($copy2);
            })
            $origin2.hide();


            let $origin3 = $('#completedclasslist').first();
            let $parent3 = $('#completedClass');
            $(jsonObj.list3).each((index, item)=>{
                let $copy3 = $origin3.clone();
                $copy3.find('div.completedlessonName').html("<h4>" + item.lessonName + "</h4>")
                $parent3.append($copy3);
            })
            $origin3.hide();


        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });

    }
        coming();

});