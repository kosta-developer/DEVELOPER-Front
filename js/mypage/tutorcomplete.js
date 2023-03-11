$(()=>{
    checkIntervalLogined();
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url:backURL+'mypage/tutor/completed',
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(jsonObj) =>{
    
                jsonObj.forEach((item)=>{
                console.log(item);
                let lessonName= item.lessonName;
                let lessonSeq = item.lessonSeq;
                let tutorId = item.tutorId;
                let classlist = `<div class='classlist-container'>
                <div class='lessonname'><a href='mypagetutorcompleteddetail.html?lessonSeq=${lessonSeq}'>${lessonName}</div>
                <div class='lessonSeq' style='display:none'>${lessonSeq}</div>
                <div class='tutorId' style='display:none'>${tutorId}</div>
                </div>`;

            $('.classlist').append(classlist);
            })
        },
        error : function(xhr){
            alert(xhr.status);
        }
    })
})
