$(()=>{
    // let url = backURL+'lesson/lessonbyuser2';
        let data = "userId=111";
        let url = 'http://172.30.1.15:8888/developer/mypage/tutor/ongoing';

    $.ajax({
        xhrFields: {
        withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        data: data,
        success: function(jsonObj){
            console.log(jsonObj)
            let $origin = $('#classlist').first();
            let $parent = $('#ongoingClass');
            $(jsonObj).each((i)=>{
                let $copy = $origin.clone();
                $copy.find('div.lessonName').html("<h4>" + jsonObj[i].lessonName + "</h4>")
                $parent.append($copy);
            })
            $origin.hide();

        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }


    });

});