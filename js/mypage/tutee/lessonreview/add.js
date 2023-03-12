var applySeq;

$(() => {
    userCheckIntervalLogined()
    //=== 미작성 후기 목록 보여주기 START ===
    let url = backURL + 'mypage/tutee/lessonreview';
    $('#myform').hide();
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)

            let $origin = $('#nowrite-lessonreview').first();
            let $parent = $('#nowrite-lessonreview-list');

            $(jsonObj).each((i) => {
                let $copy = $origin.clone();
                $copy.find('#applySeq').html(jsonObj[i].applySeq)
                $copy.find('#lessonName').html(jsonObj[i].lessonName + '<button onclick="wrtieReview(this)" value="' + jsonObj[i].applySeq + '">후기작성</button>')
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
        success: function (data) {
            alert(data);
            location.href = frontURL + 'mypage/tutee/lessonreview/myreview.html'
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    });

}
// ===== form 객체의 submit 이벤트 END


function wrtieReview(result) {
    $('#myform').show();
    applySeq = $(result).val();
    console.log(applySeq)
}

