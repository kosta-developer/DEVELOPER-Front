let url = backURL + 'host/studyroom'

$(() => {
    hostCheckIntervalLogined()


    //----정보출력 START----
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        //data:'1',  //data변수써먹기 나중에
        success: function (jsonObj) {
            console.log(jsonObj)
            let $cafeInfo = $('div.detail-content-box');

            $cafeInfo.find('div#cafe-seq').text(jsonObj.srSeq)
            $cafeInfo.find('input#cafe-name').val(jsonObj.name)
            $cafeInfo.find('input#cafe-addr').val(jsonObj.addr)
            $cafeInfo.find('input#cafe-open-time').val(jsonObj.openTime)
            $cafeInfo.find('input#cafe-close-time').val(jsonObj.endTime)
            $cafeInfo.find('textarea#cafe-info-text').val(jsonObj.info)
            let imgPath = jsonObj.imgPath
            console.log('imgPath: ' + imgPath);

            //--썸네일 이미지 다운로드 START--
            $.ajax({
                xhrFields: {
                    responseType: "blob",
                },
                cashe: false,
                url: backURL + "download/studyroom",
                method: "get",
                data: "imgPath=" + imgPath + "&opt=inline&type=1",
                success: function (result) {
                    console.log(result);
                    let blobStr = URL.createObjectURL(result);
                    $cafeInfo.find("div.cafeImage>img").attr("src", blobStr);
                    //console.log('틀렸나?'+$copy_lesson.find("div.lessonlistorigin>a").html())
                    //console.log('틀렸나first?'+$copy_lesson.find("div.lessonlistorigin>a>img").first())
                },
            });
            //--썸네일 이미지 다운로드 END--


        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })

    $('#cafe-info-text').keyup(function (e) {
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

        };
    });

    //--첨부파일이 변경되었을때 할일 START--
    let $divShow = $('div.cafeImage')
    $('#content-wrap > div > div.content-container > div.detail-content-box > form > input[type=file]').change((e) => {
        $divShow.empty()
        let imgFileObj = e.target.files[0]

        //blob타입의 이미지파일객체내용을 문자열로 변환
        let blobStr = URL.createObjectURL(imgFileObj)

        let img = $('<img>')
            .attr('src', blobStr)
            .css('margin-left', '10px')
        $('div.cafeImage').show()
        $divShow.append(img)
    })
    //--첨부파일이 변경되었을때 할일 END--

    //----오픈시간, 마감시간 24시간 설정 START----
    $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 60,
        startTime: '00:00',  //마감시간까지 00:00나면 오류남 안먹힘!
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    //----오픈시간, 마감시간 24시간 설정 END----

    //--취소버튼 클릭 시 할일 START--
    $('#content-wrap > div > div.content-container > div.detail-content-box > form > div.info-button > input[type=button]:nth-child(1)').click((e) => {
        location.href = frontURL + 'hostindex.html'
    });
    //--취소버튼 클릭 시 할일 END--



    //--폼 서브밋되었을때 할일 START--
    let $form = $('div.detail-content-box>form')
    $form.submit(() => {

        let formData = new FormData($form[0])

        //alert(formData);
        let srSeq = $('div#cafe-seq').html();

        //alert(srSeq);

        const fileInput = document.querySelector('input#cafeFile');
        const file = fileInput.files[0];
        const maxSizeInBytes = 5120000; //나중에 5MB로 바꾸기 5120000

        if (!file) {
            alert('파일을 선택해주세요')
            return false
        } else if (fileInput.files[0].size > maxSizeInBytes) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            //fileInput.value = ''; // 파일 선택 취소
            return false
        }

        $.ajax({
            xhrFields: {
                withCredentials: true //크로스오리진을 허용!
            },
            url: backURL + "host/studyroom/" + srSeq,
            method: 'post',//파일업로드용 설정
            data: formData, //파일업로드용 설정
            processData: false,//파일업로드용 설정
            MimeType: "multipart/form-data", //파일업로드용설정
            contentType: false,//파일업로드용 설정
            success: function () {
                location.href = frontURL + 'hostindex.html'
            },
            error: function (xhr) {
                alert('오류' + xhr.status)
            }
        })
        return false
    })
    //--폼 서브밋되었을때 할일 END--

})

