$(() => {
    userCheckIntervalLogined()
    $('#submit').on("click", function () {
        let $form = $('#addForm')[0];
        let formData = new FormData($form);
        let url = backURL + 'tutor/'
        formData.forEach((value, key) => {
            console.log(key)
            console.log(value)
            console.log('----')
        })
        $.ajax({
            xhrFields: {
                //크로스오리진 에러를 통과할수 있는 자격! 쿠키를 host가다른 url로 요청되어도 유지할 수 있게!
                withCredentials: true
            },
            url: url,
            method: 'post',
            data: formData, 
            contentType: false, //파일업로드용 설정 
            processData: false, //파일업로드용 설정 
            success: function (result) {
                console.log(result);
                location.href = frontURL + 'index.html'
            },
            error: function (xhr) {
                alert('관리자 승인 여부는 금일 기준 일주일 이내에 메일로 발송됩니다.')
                location.href = frontURL + 'index.html'
            }
        })
        return false;
    })
    // 써머노트 스크립트
    $(document).ready(function () {
        $('#summernote').summernote({
            height: 200, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
            focus: true // set focus to editable area after initializing summernote
        });
    });
    // 써머노트 스크립트 
});