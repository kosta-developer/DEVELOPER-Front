$(() => {
    userCheckIntervalLogined() 
    //=== 즐겨찾기한 수업 목록 보여주기 START ===
    let url = backURL + 'mypage/favoriteslesson';
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)
        
            let $origin = $('.list-fav-lesson-origin').first();
            let $parent = $('.list-fav-lesson');
            $(jsonObj).each((i) => {
                let category = jsonObj[i].category;
                if(category == 0){
                    category = '프로그래밍 언어';
                } else if(category == 1){
                    category = '웹 개발 ';
                } else if(category == 2){
                    category = '앱 개발';
                } else if(category == 3){
                    category = '보안/네트워크';
                } else if(category == 4){
                    category = '데이터';
                }

                let $copy = $origin.clone();
                $copy.find('#lessonName').html(jsonObj[i].lessonName)
                $copy.find('#category').html(category)
                $copy.find('#location').html(jsonObj[i].location)
                $copy.find('#applyEndDate').html(jsonObj[i].applyEndDate)
                
                $parent.append($copy);
            })
            $origin.hide();
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 즐겨찾기한 수업 목록 보여주기 END ===
});

//=== 수업 이름 누르면 상세 페이지로 이동 START ===
$(document).on('click', '.tutorLesson > .lessonName', function () {
    location.href = frontURL + 'lesson/detail.html';
});
//=== 수업 이름 누르면 상세 페이지로 이동 END ===