//=== 기본적인 페이지 상세 내용 보여주기 START ===
$(()=>{
    let url = backURL + 'lesson/';
    let lessonSeq = 1;
    $('.dContent-container > .lessonReview').hide();
    $('.dContent-container > .ask').hide();

    $.ajax({
        xhrFields: {
            withCredentials: true // 이 요청은 cross-origin을 허락한다. 는 뜻이다. - > 쿠키를 계속 유지할 수 있다. 
        },
        url : url + lessonSeq,
        method: 'GET',
        success: function(jsonObj){
            console.log(jsonObj)
            let category = jsonObj.category;
            console.log(category)
            if(category==0){
                category = '프로그래밍 언어';
            } else if(category==1){
                category = '웹 개발 ';
            } else if(category==2){
                category = '앱 개발';
            } else if(category==3){
                category = '보안/네트워크';
            } else if(category==4){
                category = '데이터';
            }

            $('#detail > #classImg').attr('src','/images/' + jsonObj.imgPath)
            $('#detail > .detail-container > .category').html(jsonObj.category)
            $('#detail > .detail-container > .lessonName').html("<h5>"+ jsonObj.lessonName + "</h5>")
            // $('#detail > .detail-container > .tutorName').html(jsonObj.tutorVO.usersVO.name)
            $('#detail > .detail-container > .category').html(category)
            $('#detail > .detail-container > .price').html(jsonObj.price)
            $('#detail > .detail-container > .location').html(jsonObj.location)
            $('#detail > .detail-container > .people').html(jsonObj.people)
            $('#detail > .detail-container > .cDate').html(jsonObj.startCdate + " ~ " + jsonObj.endCdate )
            $('#detail > .detail-container > .date').html(jsonObj.startDate + " ~ " + jsonObj.endDate)
            $('.dContent > .dContent-container > .detail').html(jsonObj.content)
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
            $(' .dContent > div.dContent-container > div.lessonReview > div.star').html(jsonObj.star)
            $(' .dContent > div.dContent-container > div.lessonReview > div.nickname').html(jsonObj.nickname)
            $(' .dContent > div.dContent-container > div.lessonReview > div.review').html(jsonObj.review)
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