//아직 미완성입니다.

$(() => {
    $('#room-info-text').keyup(function (e) {
        let content = $(this).val();

        // 글자수 세기
        if (content.length == 0 || content == '') {
            $('.textCount').text('0자');
        } else {
            $('.textCount').text(content.length + '자');
        }

        // 글자수 제한
        if (content.length > 200) {
            // 200자 부터는 타이핑 되지 않도록
            $(this).val($(this).val().substring(0, 200));
           
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

//--취소버튼 클릭 시 할일 START--
$('#content-wrap > div > div.content-container > div.detail-content-box > form > div.info-button > input[type=button]:nth-child(1)').click((e) => {
    location.href = frontURL + 'hostIndex.html'
})
//--취소버튼 클릭 시 할일 END--

    
})