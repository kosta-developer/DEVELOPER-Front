let url = backURL + 'studyroom/infocafe'
let data = location.search.substring(1);

$(() => {

    //----정보출력 START----
 

    //TO DO:아이디는 나중에 세션아이디로 설정하기
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        data:'hostId=suho522',  //data변수써먹기 나중에
        success: function(jsonObj){
            console.log(jsonObj)
           let $cafeInfo = $('div.detail-content-box');

           $cafeInfo.find('input#cafe-seq').val(jsonObj.srSeq)
           $cafeInfo.find('input#cafe-name').val(jsonObj.name)
           $cafeInfo.find('input#cafe-addr').val(jsonObj.addr)
        //    $cafeInfo.find('input#cafe-open-time').val(나중에시간설정)
        //    $cafeInfo.find('input#cafe-close-time').val(나중에시간설정)
           $cafeInfo.find('textarea#cafe-info-text').val(jsonObj.info)
        },  
        error: function(xhr){
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

//--취소버튼 클릭 시 할일 START--
$('#content-wrap > div > div.content-container > div.detail-content-box > form > div.info-button > input[type=button]:nth-child(1)').click((e) => {
    location.href = frontURL + 'hostIndex.html'
});
//--취소버튼 클릭 시 할일 END--


    //기타 안한 버튼 처리 하기

})