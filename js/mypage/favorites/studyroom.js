$(() => {
    //=== 즐겨찾기한 카페 목록 보여주기 START ===
    userCheckIntervalLogined();
    let url = backURL + 'mypage/favoritesstudyroom';

    let $origin = $('div.list-fav-studyroom-origin').first();
    
    $origin.show()
    $.ajax({
        url: url,
        xhrFields: {
            withCredentials: true // 이 요청은 cross-origin을 허락한다. 는 뜻이다. 쿠키를 계속 유지할 수 있다. 
        },
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.list-fav-studyroom');
            
            $(jsonObj).each((i) => {
                let $copy = $origin.clone();
                $copy.find('span#favSrSeq').html(jsonObj[i].srSeq)
                $copy.find('span#favName').html(jsonObj[i].studyroom.name)
                $copy.find('span#favAddr').html(jsonObj[i].studyroom.addr)
                
                $parent.append($copy);
            })
            $origin.hide();
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    });
});
//=== 즐겨찾기한 카페 목록 보여주기 END ===



//=== 해당블럭 누르 카페 상세 페이지로 이동 START ===
$(document).on('click', 'div.list-fav-studyroom-origin', function (e) {
    let srSeq = $(e.target).parents('div.list-fav-studyroom').find('span#favSrSeq').text();
    
    //todo: 카페상세페이지 주소 확인해서! 입력하기
    //location.href = frontURL + '?srSeq='+ srSeq
});

//=== 해당블럭 누르 카페 상세 페이지로 이동 END ===


//=== 상단바
// $(document).on('click', '.login ', function () {
//     location.href = frontURL + 'users/devlogin.html'
// });
// $(document).on('click', '.lesson ', function () {
//     location.href = frontURL + 'lesson/lessonlist.html'
// });
// $(document).on('click', '.tutorAdd ', function () {
//     location.href = frontURL + 'tutor/add.html'
// });
// $(document).on('click', '.myPage ', function () {
//     location.href = frontURL + 'mypage/favorites/lesson.html';
// });

//=== 사이드바