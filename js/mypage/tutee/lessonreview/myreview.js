$(() => {
    userCheckIntervalLogined()
    //=== 즐겨찾기한 수업 목록 보여주기 START ===
    let url = backURL + 'mypage/tutee/myreview';

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)
            $('#showLoginId').html(sessionStorage.getItem("logined"));
        
            let $origin = $('#review').first();
            let $parent = $('#myreview-list');
            $(jsonObj).each((i) => {
                let star;
                if (2.0 > jsonObj[i].star && jsonObj[i].star >= 0) {
                    star = "⭐️";
                } else if (3.0 > jsonObj[i].star && jsonObj[i].star >= 2.0) {
                    star = "⭐️⭐️";
                } else if (4.0 > jsonObj[i].star && jsonObj[i].star >= 3.0) {
                    star = "⭐️⭐️⭐️";
                } else if (5.0 > jsonObj[i].star && jsonObj[i].star >= 4.0) {
                    star = "⭐️⭐️⭐️⭐️";
                } else if (jsonObj[i].star && jsonObj[i].star >= 5.0) {
                    star = "⭐️⭐️⭐️⭐️⭐️";
                }

                let $copy = $origin.clone();
                $copy.find('.lessonName').html(jsonObj[i].lessonName)
                $copy.find('.name').html(jsonObj[i].name)
                $copy.find('.star').html(star + " (" + jsonObj[i].star + ")")
                $copy.find('.review').html(jsonObj[i].review)
                
                $parent.append($copy);
            })
            $origin.hide();
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 튜터 상세 내용 보여주기 END ===

