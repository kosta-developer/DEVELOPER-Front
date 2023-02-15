//=== 기본적인 페이지 상세 내용 보여주기 START ===
$(()=>{
    let url = backURL + 'lesson/detail';
    let data = "lessonSeq=1";
    $('.dContent-container > .lessonReview').hide();
    $('.dContent-container > .ask').hide();

    $.ajax({
        url : url,
        data: data,
        success: function(jsonObj){
            let category = jsonObj[0].category;
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

            $('#detail > #classImg').attr('src','/images/' + jsonObj[0].imgPath)
            $('#detail > .detail-container > .category').html(jsonObj[0].category)
            $('#detail > .detail-container > .lessonName').html("<h5>"+ jsonObj[0].lessonName + "</h5>")
            $('#detail > .detail-container > .tutorName').html(jsonObj[0].tutorVO.usersVO.name)
            $('#detail > .detail-container > .category').html(category)
            $('#detail > .detail-container > .price').html(jsonObj[0].price)
            $('#detail > .detail-container > .location').html(jsonObj[0].location)
            $('#detail > .detail-container > .people').html(jsonObj[0].people)
            $('#detail > .detail-container > .cDate').html(jsonObj[0].startCdate + " ~ " + jsonObj[0].endCdate )
            $('#detail > .detail-container > .date').html(jsonObj[0].startDate + " ~ " + jsonObj[0].endDate)
            $('.dContent > .dContent-container > .detail').html(jsonObj[0].content)
        }, 
        error: function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 기본적인 페이지 상세 내용 보여주기 END ===

//=== 상세정보 보여주기 START ===
$(document).on('click', '.dContent > .btn-container > #detailbtn', function(){
    $('.dContent > div.dContent-container > div.detail').show();
    $('.dContent > div.dContent-container > div.lessonReview').hide();
    $('.dContent > div.dContent-container > div.ask').hide();
});
//=== 상세정보 보여주기 END ===

//=== 문의하기 보여주기 START ===
$(document).on('click', '.dContent > .btn-container >#askbtn', function(){
    $('.dContent > div.dContent-container > div.detail').hide();
    $('.dContent > div.dContent-container > div.lessonReview').hide();
    $('.dContent > div.dContent-container > div.ask').show();
});
//=== 문의하기 보여주기 END ===

//=== 수강평 보여주기 START ===
$(document).on('click', '.dContent > .btn-container >#lessonReviewbtn', function(){
    $('.dContent > div.dContent-container > div.detail').hide();
    $('.dContent > div.dContent-container > div.lessonReview').show();
    $('.dContent > div.dContent-container > div.ask').hide();
    
    url = backURL + 'lesson/review';
    data = "lessonSeq=1";

    $.ajax({
        url : url,
        data: data,
        success: function(jsonObj){
            $(' .dContent > div.dContent-container > div.lessonReview > div.star').html(jsonObj[0].star)
            $(' .dContent > div.dContent-container > div.lessonReview > div.nickname').html(jsonObj[0].nickname)
            $(' .dContent > div.dContent-container > div.lessonReview > div.review').html(jsonObj[0].review)
        }, 
        error: function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 수강평 보여주기 END ===

//=== 로고/강사명 누르면 페이지 이동 START
$(document).on('click', '#logo', function(){
    location.href = frontURL + 'index.html';
});
$(document).on('click', '#detail > .detail-container> div.tutorName', function(){
    location.href = frontURL + 'lesson/tutorinfo.html';
});
//=== 강사명 누르면 페이지 이동 END