$(()=>{
    userCheckIntervalLogined();
        let url = backURL + 'mypage/tutor/upcoming';

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
                $copy.find('div.lessonName').html("<h4>" + jsonObj[i].lessonName + "</h4>")
                $copy.find('div.lessonSeq').html(jsonObj[i].lessonSeq)

                $parent.append($copy);
            })
            $origin.hide();

            $(document).on('click','div.lessonName', (e)=>{
                // let unpaidlessonSeq = $(e.target).html()
                let lessonSeq = $(e.currentTarget).parent().find('div.lessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                // location.href = frontURL + 'admin/host/detail/'+hostId
                location.href = frontURL +'mypage/tutor/comingdetail.html?lessonSeq=' + lessonSeq;
            })

        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });

});