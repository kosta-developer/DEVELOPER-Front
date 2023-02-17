//아직 미완성입니다.

$(() => {
    $('#info').keyup(function (e) {
        let content = $(this).val();

        // 글자수 세기
        if (content.length == 0 || content == '') {
            $('.textCount').text('0자');
        } else {
            $('.textCount').text(content.length + '자');
        }

        // 글자수 제한
        if (content.length > 300) {
            // 300자 부터는 타이핑 되지 않도록
            $(this).val($(this).val().substring(0, 300));
            // 300자 넘으면 알림창 뜨도록
            alert('글자수는 300자까지 입력 가능합니다.');
        };
    });

    //--폼 서브밋되었을때 할일 START--
    let $form = $('div.form')
    $form.submit(() => {
        let formData = new FormData($form[0])
       

        $.ajax({
            xhrFields: {
                withCredentials: true //크로스오리진을 허용!
             },
            url: backURL + "studyroom/addcafe",
            method: 'post',//파일업로드용 설정
            data: formData, //파일업로드용 설정
            processData: false,//파일업로드용 설정
            MimeType: "multipart/form-data", //파일업로드용설정
            contentType: false,//파일업로드용 설정
            success: function () {

            },
            error: function (xhr) {
                alert('오류' + xhr.status)
            }
        })
        return false
    })
    //--폼 서브밋되었을때 할일 END--

    //----오픈시간, 마감시간 24시간 설정 START----
    $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 10,
        startTime: '00:00',  //마감시간까지 00:00나면 오류남 안먹힘!
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    //----오픈시간, 마감시간 24시간 설정 END----


    
})