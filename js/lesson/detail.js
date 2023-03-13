let logined = sessionStorage.getItem("logined");
let favStatus;
let favLesSeq;
// let queryParams = new URLSearchParams(window.location.search);
// let lessonSeq = queryParams.get('lessonSeq');

$(() => {

    userCheckIntervalLogined()
    //=== 선택한 수업의 상세 내용 보여주기 START ===
    let lessonSeq = location.search.substring(1).split('?');
    let url = backURL + 'lesson/detail/' + lessonSeq;

    $('.dContent-container > .lessonReview').hide();
    $('.dContent-container > .ask').hide();
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)

            //이미 신청한 사용자라면 버튼 없애기
            $(jsonObj.lessonDto.alDTO).each((i) => {
                if (jsonObj.lessonDto.alDTO[i].tuteeId == logined) {
                    $('#applyBtn').hide();
                }
            });

            //이미 즐겨찾기한 사용자라면 버튼 색 바꾸기
            $(jsonObj.lessonDto.flDTO).each((i) => {
                if (jsonObj.lessonDto.flDTO[i].tuteeId == logined) {
                    $('#favoritesBtn').css('backgroundColor', 'yellow');
                    favLesSeq = jsonObj.lessonDto.flDTO[i].favLesSeq;
                    console.log(favLesSeq)
                    favStatus = 0; //즐겨찾기OOO
                } else {
                    favStatus = 1; //즐겨찾기XXX
                }
            });

            let category = jsonObj.lessonDto.category;
            if (category == 0) {
                category = '프로그래밍 언어';
            } else if (category == 1) {
                category = '웹 개발 ';
            } else if (category == 2) {
                category = '앱 개발';
            } else if (category == 3) {
                category = '보안/네트워크';
            } else if (category == 4) {
                category = '데이터';
            }

            let price = jsonObj.lessonDto.price;
            if (price == 0) {
                price = "무료";
            }

            $('#detail > #classImg').attr('src', '/images/' + jsonObj.lessonDto.imgPath)
            $('#detail > .detail-container > .category').html(category)
            $('#detail > .detail-container > .lessonName').html("<h5>" + jsonObj.lessonDto.lessonName + "</h5>")
            $('#detail > .detail-container > .tutorName').html(jsonObj.lessonDto.udto.name)
            $('#detail > .detail-container > .tutorId').html(jsonObj.lessonDto.tdto.tutorId)
            $('#detail > .detail-container > .category').html(category)
            $('#detail > .detail-container > .price').html(price)
            $('#detail > .detail-container > .location').html(jsonObj.lessonDto.location)
            $('#detail > .detail-container > .people').html(jsonObj.lessonDto.people)
            $('#detail > .detail-container > .cDate').html(jsonObj.lessonDto.startCdate + " ~ " + jsonObj.lessonDto.endCdate)
            $('#detail > .detail-container > .date').html(jsonObj.lessonDto.startDate + " ~ " + jsonObj.lessonDto.endDate)
            $('.dContent > .dContent-container > .detail').html(jsonObj.lessonDto.content)
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 선택한 수업의 상세 내용 보여주기 END ===


    //=== 강사명 누르면 페이지 이동 START
    $('#detail').on('click', 'div.tutorName', (e) => {
        let tutorId = $(e.target).parents('div.detail-container').find('div.tutorId').html();
        location.href = frontURL + 'lesson/tutorinfo.html?' + tutorId;
    });
    //=== 강사명 누르면 페이지 이동 END


    //=== 수업 즐겨찾기 등록 START
    document.getElementById("favoritesBtn").onclick = function () {
        lessonSeq = location.search.substring(1).split('?');
        if (favStatus == 0) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: 'delete',
                url: backURL + 'lesson/favoriteslesson/' + favLesSeq,
                success: function () {
                    $('#favoritesBtn').css('backgroundColor', 'greenyellow');
                    alert("즐겨찾기 삭제");
                },
                error: function (xhr) {
                    let jsonObj = JSON.parse(xhr.responseText);
                    alert(jsonObj.msg);
                }
            });
        } else {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: "post",
                url: backURL + 'lesson/favoriteslesson/' + lessonSeq,
                success: function () {
                    $('#favoritesBtn').css('backgroundColor', 'yellow');
                    alert("즐겨찾기 등록");
                },
                error: function (xhr) {
                    let jsonObj = JSON.parse(xhr.responseText);
                    alert(jsonObj.msg);
                }
            });
        }
    };
    //=== 수업 즐겨찾기 등록 END


    //=== 수업 신청하기 START
    document.getElementById("applyBtn").onclick = function () {
        lessonSeq = location.search.substring(1).split('?');
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'lesson/apply/' + lessonSeq,
            success: function (jsonObj) {
                console.log(jsonObj)
                alert("수업이 신청되었습니다. 승인여부는 마이페이지에서 확인 가능합니다.");
                location.href = frontURL + 'mypage/tutee/dashboard.html';
            },
            error: function (xhr) {
                let jsonObj = JSON.parse(xhr.responseText);
                alert(jsonObj.msg);
            }
        });

    };
    //=== 수업 신청하기 END


});


//=== 상세정보 보여주기 START ===
$(document).on('click', '.dContent > .btn-container > #detailbtn', function () {
    $('.dContent > div.dContent-container > div.detail').show();
    $('.dContent > div.dContent-container > div.lessonReview').hide();
});
//=== 상세정보 보여주기 END ===


//=== 수강평 보여주기 START ===
$(document).on('click', '.dContent > .btn-container >#lessonReviewbtn', function () {
    $('.dContent > div.dContent-container > div.detail').hide();
    $('.dContent > div.dContent-container > div.lessonReview').show();

    let lessonSeq = location.search.substring(1).split('?');
    url = backURL + 'lesson/review/' + lessonSeq;

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)

            if (jsonObj == 0) {
                $('div.dContent-container > div.lessonReview').html("등록된 수강평이 없습니다.")
            } else {
                $(jsonObj).each((index) => {
                    let star = jsonObj[index].alDTO[index].lrdto.star;
                    if (2.0 > star && star >= 0) {
                        star = "⭐️";
                    } else if (3.0 > star && star >= 2.0) {
                        star = "⭐️⭐️";
                    } else if (4.0 > star && star >= 3.0) {
                        star = "⭐️⭐️⭐️";
                    } else if (5.0 > star && star >= 4.0) {
                        star = "⭐️⭐️⭐️⭐️";
                    } else if (star && star >= 5.0) {
                        star = "⭐️⭐️⭐️⭐️⭐️";
                    }

                    $(' .dContent > div.dContent-container > div.lessonReview > div.star').html(star)
                    $(' .dContent > div.dContent-container > div.lessonReview > div.nickname').html(jsonObj[index].name)
                    $(' .dContent > div.dContent-container > div.lessonReview > div.writeDate').html(jsonObj[index].alDTO[index].lrdto.cdate)
                    $(' .dContent > div.dContent-container > div.lessonReview > div.review').html(jsonObj[index].alDTO[index].lrdto.review)
                });
            }
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 수강평 보여주기 END ===