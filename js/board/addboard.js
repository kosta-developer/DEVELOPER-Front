$(() => {
    userCheckIntervalLogined();
    //--첨부파일이 변경되었을때 할일 START--
    let $divShow = $('div.show')
    $('div.form>form>input[type=file]').change((e) => {
        $(e.target.files).each((index, imgFileObj) => {
            // let imgFileObj = e.target.files[0]

            console.log(imgFileObj)
            //blob타입의 이미지파일객체내용을 문자열로 변환
            let blobStr = URL.createObjectURL(imgFileObj)
            // $('div.show>img').attr('src', blobStr)
            let img = $('<img>')
                .attr('src', blobStr)
                .css('margin-left', '10px')
            $divShow.append(img)
        })
    })

    //작성버튼 클릭시
    $('#addbtn').on("click", function () {
        let $form = $('#addBoardForm')[0];
        let formData = new FormData($form);
        let url = backURL + 'board/add'
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
            data: formData, //파일업로드용 설정       processData : false,//파일업로드용 설정
            contentType: false, //파일업로드용 설정       mimeType : "multipart/form-data",
            processData: false,
            success: function (result) {
                console.log(result);
                location.href = frontURL + 'board/boardlist.html'
            },
            error: function (xhr) {
                alert('오류' + xhr.status)
            }
        })
        return false;
    })
    // 써머노트 스크립트
    $(document).ready(function () {
        $('#summernote').summernote({
            width: 800,
            height: 300, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
            focus: true // set focus to editable area after initializing summernote
        });
    });
    // 써머노트 스크립트 
});
