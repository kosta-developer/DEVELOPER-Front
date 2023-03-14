$(() => {
    hostCheckIntervalLogined()

    $('#session').html(localStorage.getItem("hostId"));

    //=================[textarea 글자수세기 START]==================
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
        };
    });
    //=================[textarea 글자수세기 END]==================






    //=================[첨부파일이 변경되었을 때 START]==================
    let $divShow = $('div.show')
    $('#cafeFile').change((e) => {
        $(e.target.files).each((index, imgFileObj) => {
            $divShow.empty()
            imgFileObj = e.target.files[0]

            //blob타입의 이미지파일객체내용을 문자열로 변환
            let blobStr = URL.createObjectURL(imgFileObj)
            // $('div.show>img').attr('src', blobStr)
            let img = $('<img>')
                .attr('src', blobStr)
                .css('margin-left', '10px')
            $('div.show').show()
            $divShow.append(img)
        })
    })
    //=================[첨부파일이 변경되었을 때 END]==================





    //=================[폼에서 스터디카페 추가 버튼 클릭 시 START]==================
    let $form = $('div.addstudycafeform>form')
    const hostId = localStorage.getItem("hostId");
    $form.submit(() => {
        let formData = new FormData($form[0])
        console.log(localStorage.getItem("hostId"))
        let name = $('input#nameCafe').val();
        let info = $('textarea#info').val();
        let openTime = $('input#openTime').val();
        let endTime = $('input#endTime').val();
        let addr = $('input#sample6_address').val(); // 주소 변수
        let extraAddr = $('input#sample6_extraAddress').val(); // 참고항목 변수
        let detailAddr = $('input#sample6_detailAddress').val(); //상세주소 변수
        let sumaddr = addr + extraAddr + ' ' + detailAddr
        let hostId = $('div#session').val(); 

        formData.append("addr", sumaddr);

        const fileInput = document.querySelector('input#cafeFile');
        const file = fileInput.files[0];
        const maxSizeInBytes = 5100000; //나중에 5MB로 바꾸기 5120000

        if (!name) {  // = if(name="")
            alert("스터디카페 이름을 입력해주세요.");
            return false;
        };

        if (!file) {
            alert('파일을 선택해주세요')
            return false
        }

        if (fileInput.files[0].size > maxSizeInBytes) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            return false
        }

        if (!addr) {
            alert('주소를 입력해주세요')
            return false
        }

        if (!info) {
            alert('상세정보를 입력해주세요')
            return false
        }

        if (!openTime) {
            alert('오픈시간을 입력해주세요')
            return false
        }

        if (!endTime) {
            alert('마감시간을 입력해주세요')
            return false
        }

        $.ajax({
            xhrFields: {
                withCredentials: true //크로스오리진을 허용!
            },
            url: backURL + "join/studyroom",
            method: 'post',//파일업로드용 설정
            data: formData, //파일업로드용 설정
            processData: false,//파일업로드용 설정
            MimeType: "multipart/form-data", //파일업로드용설정
            contentType: false,//파일업로드용 설정
            success: function () {
                location.href = frontURL + 'hostindex.html'

            },
            error: function (xhr) {
                alert(xhr.responseText)
            }
        })
        return false
    })

    //=================[폼에서 스터디카페 추가 버튼 클릭 시 END]==================





    //=================[오픈, 마감 스크롤바 TIMEPICKER START]==================
    $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 60,
        startTime: '00:00',  //마감시간까지 00:00나면 오류남 안먹힘!
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    //=================[오픈, 마감 스크롤바 TIMEPICKER END]==================



})