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
                $copy.find('div.lessonName').html("<h4>" + jsonObj.applyList[i].lessonName + "</h4>")
                $copy.find('div.lessonSeq').html(jsonObj.applyList[i].lessonSeq)

                $parent.append($copy);
            })
            $origin.hide();

            $(document).on('click','div.lessonName', (e)=>{
                let lessonSeq = $(e.currentTarget).parent().find('div.lessonSeq').html()
                console.log('클릭한 lessonName의 시퀀스는' +lessonSeq)
                location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
            })

            let $origin2 = $('#classlist2').first();
            let $parent2 = $('#notyetClass');

            $(jsonObj).each((i)=>{
                let $copy2 = $origin2.clone();
                $copy2.find('div.notyetlessonName').html("<h4>" + jsonObj.notYetlist[i].lessonName + "</h4>")
                $copy2.find('div.notyetlessonSeq').html(jsonObj.notYetlist[i].lessonSeq)

                    $parent2.append($copy2);
                })
                // console.log('이거는'+jsonObj[i].applyList)
                $origin2.hide();

                $(document).on('click','div.notyetlessonName', (e)=>{
                    // let unpaidlessonSeq = $(e.target).html()
                    let lessonSeq = $(e.currentTarget).parent().find('div.notyetlessonSeq').html()
                    console.log('클릭한 notyetlessonName 시퀀스는' +lessonSeq)
                    // location.href = frontURL + 'admin/host/detail/'+hostId
                    location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
                })

            },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }

     });

    }


        coming();

});