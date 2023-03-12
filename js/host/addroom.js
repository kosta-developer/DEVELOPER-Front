$(() => {
    hostCheckIntervalLogined()



    //--첨부파일이 변경되었을때 할일 START--
    let $divShow = $('div.roomImage')
    $('#content-wrap > div > div.content-container > div.detail-content-box > form > input[type=file]').change((e) => {
        $divShow.empty()
        let imgFileObj = e.target.files[0]

        console.log(imgFileObj)
        //blob타입의 이미지파일객체내용을 문자열로 변환
        let blobStr = URL.createObjectURL(imgFileObj)

        let img = $('<img>')
            .attr('src', blobStr)
            .css('margin-left', '10px')
        $('div.roomImage').show()
        $divShow.append(img)
    })
    //--첨부파일이 변경되었을때 할일 END--


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
    let $form = $('div.detail-content-box>form')
    $form.submit(() => {
        let formData = new FormData($form[0])
        alert(formData);

        const srSeq = localStorage.getItem("srSeq");
        console.log(srSeq)
        formData.append("srSeq", srSeq);
        localStorage.removeItem("srSeq");

        $.ajax({
            xhrFields: {
                withCredentials: true //크로스오리진을 허용!
            },
            url: backURL + "host/roominfo/" + srSeq,
            method: 'post',//파일업로드용 설정
            data: formData, //파일업로드용 설정
            processData: false,//파일업로드용 설정
            MimeType: "multipart/form-data", //파일업로드용설정
            contentType: false,//파일업로드용 설정
            success: function () {
                location.href = frontURL + 'host/listroom.html'
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
        location.href = frontURL + 'hostindex.html'
    })
    //--취소버튼 클릭 시 할일 END--


})