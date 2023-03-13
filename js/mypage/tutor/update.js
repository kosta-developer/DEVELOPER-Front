$(() => {
    userCheckIntervalLogined();

    let queryParams = new URLSearchParams(window.location.search);
    let lessonSeq = queryParams.get('lessonSeq');
    let url = backURL + 'mypage/tutor/upcoming/detail/update/'+lessonSeq;


    function Lessondetail() {
        $.ajax({
            xhrFields: {
            withCredentials: true
            },   
            url: backURL + 'lesson/detail/' + lessonSeq,
            success: function(jsonObj) {
                
                    $('#classname').val(jsonObj.lessonDto.lessonName);
                    $('#place').val(jsonObj.lessonDto.location);
                    $('#tuteecount').val(jsonObj.lessonDto.people);
                    $('#classprice').val(jsonObj.lessonDto.price);

                    //썸머노트에 데이터 불러오기 START
                    let notecontent = JSON.stringify(jsonObj.lessonDto.content);
                    console.log(jsonObj)
                    $('#summernote').summernote('editor.insertText', notecontent);
                    //썸머노트에 데이터 불러오기 END

                    //카테고리 값 셀렉트 Value로 넣어주기 START
                    $('#lessoncate').val(jsonObj.lessonDto.category);
                    let payvalue = jsonObj.lessonDto.payLesson
                    //카테고리 값 셀렉트 Value로 넣어주기 END
                    
                    //무료수업 유료수업 체크하기 START
                    let payLesson = document.getElementsByName("payLesson");
                    if (payvalue === 0) {
                    payLesson[0].checked = true;
                    } else if (payvalue === 2) {
                    payLesson[1].checked = true;
                    }
                    //무료수업 유료수업 체크하기 END


                    // let startDateStr = jsonObj.lessonDto.startDate; // JSON 객체의 startDate 필드 값
                    // console.log(startDateStr)
                    // let startDate = new Date(startDateStr); // Date 객체로 변환
                    // // $('#startapply').val(startDate);
                    // startDate = moment("Tue Feb 28 2023 09:00:00 GMT+0900 (\uD55C\uAD6D \uD45C\uC900\uC2DC)", "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
                    // let formattedDate = startDate.format("YYYY-MM-DD");

                    // console.log(formattedDate)

                    let startDateStr = jsonObj.lessonDto.startDate; // JSON 객체의 startDate 필드 값
                    console.log(startDateStr);
                    let startDate = new Date(startDateStr); // Date 객체로 변환
                    let startApplyVal = startDate.toISOString().slice(0, 10); // "yyyy-MM-dd" 형식으로 변환
                    $('#startapply').val(startApplyVal);

                    let endDateStr = jsonObj.lessonDto.endDate;
                    let endDate = new Date(endDateStr);
                    let endapplyVal = endDate.toISOString().slice(0, 10); 
                    $('#endapply').val(endapplyVal);

                    let startlesson = jsonObj.lessonDto.startCdate;
                    let startCdate = new Date(startlesson);
                    let startVal = startCdate.toISOString().slice(0, 10); 
                    $('#startlesson').val(startVal);

                    let endCdateStr = jsonObj.lessonDto.endCdate;
                    let endCdate = new Date(endCdateStr);
                    let endVal = endCdate.toISOString().slice(0, 10); 
                    $('#endlesson').val(endVal);
                    
                    

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ': ' + errorThrown);
                

            }
    
        })
    
    }



    Lessondetail();

    




    //=== 썸머노트 부르기 START ===
    $(document).ready(function () {
        $('#summernote').summernote({
            height: 300,                 // set editor height
            focus: true                  // set focus to editable area after initializing summernote
        });
    });
    //=== 썸머노트 부르기 END ===

    //=== 입력받은 정보 보내는 작업 START ===
    $('#addBtn').on("click", function () {
        let $form = $('#addForm')[0];
        let formData = new FormData($form);
        formData.forEach((value, key) => {
            console.log(key)
            console.log(value)
            console.log('----')
        })
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: url,
            method: 'POST',
            data: formData,
            contentType: false, //파일업로드용 설정
            processData: false, //파일업로드용 설정  
            success: function (result) {
                console.log(result);
                location.href = frontURL + 'mypage/tutor/comingdetail.html?lessonSeq='+lessonSeq
            },
            error: function (xhr) {
                alert('ERROR: ' + xhr.status)
            }
        })
        return false;
    })
    //=== 입력받은 정보 보내는 작업 END ===

});


//=== 로고 누르면 해당 페이지로 이동 START ===
$(document).on('click', '#logo', function () {
    location.href = frontURL + 'index.html';
});
//=== 로고 누르면 해당 페이지로 이동 END ===