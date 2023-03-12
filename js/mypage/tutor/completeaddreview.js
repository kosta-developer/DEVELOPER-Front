let url = new URL(location.href);
let seq = url.searchParams.get("lessonSeq");
let lessonSeq = Number(seq);

$(()=>{
    checkIntervalLogined();

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
                            $copy_classandtuteelist.find('div.completedtutee').html("튜티 : "+res[index].username +'<button onclick="writebtn(this)" value="' + res[index].applySeq.applySeq + '">후기작성</button>')
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

    // document.addEventListener("DOMContentLoaded", function() {
        // $(document).on('click','.writebtn',function(event){
        //     event.preventDefault();  
        //     alert('클릭')
        //     let star = $('[name=rating]:checked').val();
        //     let applySeqRv = $('div.applyseq').text();
        //     let content = $('textarea#writeReview').val();
        //     let review = document.getElementById("writeReview").value;
        //     let data = {
        //                 applySeqRv:applySeqRv,
        //                 star:star,
        //                 review:content
        //                 }
        //     $.ajax({
        //         xhrFields: {
        //             withCredentials: true
        //         },
        //         url : backURL+'mypage/tutor/completed/addreview/'+applySeqRv,
        //         method:'post',
        //         contentType: "application/json; charset=utf-8",
        //         data:JSON.stringify(data),
        //         success:function(response){
        //             alert('후기를 등록했습니다!')
        //             console.log('success:',response);
        //             location.href=backURL+'mypage/tutor/completeddetail.html?lessonSeq='+lessonSeq;
        //         },
        //         error:function(xhr){
        //             alert(xhr.status);
        //             console.log('error'+xhr);
        //         }
        //     })
        // })

})

// ===== form 객체의 submit 이벤트 START
function addReview() {
    var formData = $('#addReviewForm').serialize()
    console.log(formData);
    url = backURL+'mypage/tutor/completed/addreview/'+applySeqRv;
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: "POST",
        data: formData,
        success: function (data) {
            alert(data);
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
    console.log(applySeqRv)
}