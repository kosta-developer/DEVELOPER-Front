var applySeq;
var data;


$(() => {
    userCheckIntervalLogined()
    //=== 미작성 후기 목록 보여주기 START ===
    let url = backURL + 'mypage/tutee/lessonreview';
    $('#add > div.content-container > div > div.main > div.add-section').hide();
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)
            $('#showLoginId').html(sessionStorage.getItem("logined"));

            let $origin = $('#nowrite-lessonreview').first();
            let $parent = $('#nowrite-lessonreview-list');
            $(jsonObj).each((i) => {
                let $copy = $origin.clone();
                $copy.find('#lessonName>#applySeq').html(jsonObj[i].applySeq)
                $copy.find('#lessonName>span#name').html('📍 ' + jsonObj[i].lessonName ).css('background-color', '#F9F9F9');
                $copy.find('#lessonName>button');
                $parent.append($copy);
            })
            $origin.hide();

            
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 미작성 후기 목록 보여주기 END ===

    $( '#nowrite-lessonreview-list').on('click',  '#nowrite-lessonreview>#lessonName>button.addBtn', (e)=>{
        let addReviewlessonName =  $(e.target).siblings('#name').html();
        alert(addReviewlessonName)
        $('#nowrite-lessonreview-list').hide();
        $('#add > div.content-container > div > div.main > div.add-section').show();
        $('#add-section-lessonName').html(addReviewlessonName)
        applySeq = $(e.target).siblings('#applySeq').html();
        console.log(applySeq)
    })

    
});

// ===== form 객체의 submit 이벤트 START
function addReview() {
    var formData = $('#myform').serialize()
    console.log(formData);
    url = backURL + 'mypage/tutee/lessonreview/' + applySeq;
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: "POST",
        data: formData,
        success: function () {
            alert('후기 등록이 완료되었습니다.')
            $('#div.add-section-lessonName').hide();
            location.href = frontURL + 'mypage/tutee/lessonreview/myreview.html'
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    });

}
// ===== form 객체의 submit 이벤트 END


