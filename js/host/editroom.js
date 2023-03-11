//let data = location.search.substring(1);
let roomSeq = document.location.href.split("=")[1];
let url = backURL + 'host/roominfo/' + roomSeq;
console.log(roomSeq);

$(() => {
    hostCheckIntervalLogined()
    let $origin = $('div.room-list-origin').first()

    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $roomInfo = $('div.detail-content-box');

            //let roomSeq = $('input#room-seq').val()

            $roomInfo.find('input#room-seq').val(jsonObj.roomSeq)
            $roomInfo.find('input#room-name').val(jsonObj.name)
            $roomInfo.find('input#room-person').val(jsonObj.person)
            $roomInfo.find('input#room-price').val(jsonObj.price)
            $roomInfo.find('textarea#room-info-text').val(jsonObj.info)


            let imgPath = jsonObj.imgPath
            console.log('imgPath: ' + imgPath);

            //--썸네일 이미지 다운로드 START--
            $.ajax({
                xhrFields: {
                    responseType: "blob",
                },
                cashe: false,
                url: backURL + "download/roominfo",
                method: "get",
                data: "imgPath=" + imgPath + "&opt=inline&type=1",
                success: function (result) {
                    console.log(result);
                    let blobStr = URL.createObjectURL(result);
                    $roomInfo.find("div.roomImage>img").attr("src", blobStr);
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

    //----textarea 글자수세기 START----
    $('#room-info-text').keyup(function (e) {
        let content = $(this).val();

        // 글자수 세기
        if (content.length == 0 || content == '') {
            $('.textCount').text('0자');
        } else {
            $('.textCount').text(content.length + '자');
        }

        // 글자수 제한
        if (content.length > 100) {
            // 100자 부터는 타이핑 되지 않도록
            $(this).val($(this).val().substring(0, 100));

        };
    });
    //----textarea 글자수세기 END----



    //--첨부파일이 변경되었을때 할일 START--
    let $divShow = $('div.roomImage')
    $('#content-wrap > div > div.content-container > div.detail-content-box > form > div:nth-child(6) > input[type=file]').change((e) => {
        $divShow.empty()
        let imgFileObj = e.target.files[0]

        console.log('얏호');
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




    //--폼 서브밋되었을때 할일 START--
    let $form = $('div.detail-content-box>form')
    $form.submit(() => {

        let formData = new FormData($form[0])


        //let roomSeq = $('input#room-seq').val();
        // console.log('시퀀스값: ' + roomSeq)

        const fileInput = document.querySelector('input#roomFile');
        const file = fileInput.files[0];
        const maxSizeInBytes = 5120000; //나중에 5MB로 바꾸기 5120000

        if (!file) {
            alert('파일을 선택해주세요')
            return false
        } else if (fileInput.files[0].size > maxSizeInBytes) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            return false
        }

        $.ajax({
            xhrFields: {
                withCredentials: true //크로스오리진을 허용!
            },
            url: backURL + "host/roominfo/edit/" + roomSeq,
            method: 'post',//파일업로드용 설정
            data: formData, //파일업로드용 설정
            processData: false,//파일업로드용 설정
            MimeType: "multipart/form-data", //파일업로드용설정
            contentType: false,//파일업로드용 설정
            success: function () {
                alert('수정이 완료되었습니다.')
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
        location.href = frontURL + 'host/listroom.html'
    })
    //--취소버튼 클릭 시 할일 END--

    
    //----방삭제 버튼 클릭 시 START----
    function confirmModal() {
        let confirm = window.confirm("정말 삭제하시겠습니까?");

        if (confirm == true) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: backURL + 'host/roominfo/' + roomSeq,
                method: 'put',
                success: function (result) {
                    console.log(result);
                    alert('해당 방이 삭제되었습니다.')
                    location.href = frontURL + 'host/listroom.html'
                },
                error: function (xhr) {
                    alert(xhr.status)
                }
            })
        } else if (confirm == false) {
            self.opener = self;
            window.close;
        }
    }
    $('#deleteroom').click((e) => {
        confirmModal()
    })
    //----방삭제 버튼 클릭 시  END----
})