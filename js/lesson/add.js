$(() => {
    let url = backURL + 'lesson/';

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
                location.href = frontURL + 'lesson/list.html'
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