let url = backURL + 'roominfo/inforoom';
let data = location.search.substring(1);
//let roomSeq = document.location.href.split("?")[1];

$(() => {

    let $origin = $('div.room-list-origin').first()

    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        data: data,
        success: function (jsonObj) {
            console.log(jsonObj)
            let $roomInfo = $('div.detail-content-box');

            $roomInfo.find('input#room-seq').val(jsonObj.roomSeq)
            $roomInfo.find('input#room-name').val(jsonObj.name)
            $roomInfo.find('input#room-person').val(jsonObj.person)
            $roomInfo.find('input#room-price').val(jsonObj.price)
            $roomInfo.find('textarea#room-info-text').val(jsonObj.info)
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
    

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
})
