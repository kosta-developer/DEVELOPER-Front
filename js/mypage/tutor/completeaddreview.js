let url = new URL(location.href);
let seq = url.searchParams.get("lessonSeq");
let lessonSeq = Number(seq);

$(()=>{
    userCheckIntervalLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));
    
    //== 미작성 후기 목록 보여주기 START ==
    let $parent_classandtutee = $('div#classandtutee');
    let $origin_classandtuteelist= $('div#classandtuteelist').first()
    $origin_classandtuteelist.show()
    $('#addReviewForm').hide();

    $.ajax({
        xhrFields: {
            withCredentials: true 
        },
        url:backURL+'mypage/tutor/completed/addreview/' + lessonSeq,
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(res) =>{
                $(res).each((index)=>{
                    let $copy_classandtuteelist = $origin_classandtuteelist.clone();
                            $copy_classandtuteelist.find('div.completedclass').html("["+(index+1)+"] "+res[index].lessonName.lessonName)
                            $copy_classandtuteelist.find('div.completedtutee').html("튜티 : "+res[index].username +'<button onclick="wrtieReview(this)" value="' + res[index].applySeq.applySeq + '">후기작성</button>')
                            $copy_classandtuteelist.find('div.applyseq').html(res[index].applySeq.applySeq)
                        $parent_classandtutee.append($copy_classandtuteelist)
                })
                $origin_classandtuteelist.hide();
        },
        error : function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    })
    //=== 미작성 후기 목록 보여주기 END ===

})

// ===== form 객체의 submit 이벤트 START
function addReview() {
    var formData = $('#addReviewForm').serialize()
    let star = $('[name=rating]:checked').val();
    let review = $('textarea#writeReview').val();
    console.log(formData);
    url = backURL+'mypage/tutor/completed/addreview/'+applySeqRv;
    console.log(formData);
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: "POST",
        data: {
            star:star,
            review:review
        },
        success: function () {
            alert("후기가 작성되었습니다!");
            location.href = frontURL +'mypage/tutor/completeddetail.html?lessonSeq='+lessonSeq;
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    });

}

 
// ===== form 객체의 submit 이벤트 END


function wrtieReview(result) {
    $('#addReviewForm').show();
    applySeqRv = $(result).val();
}