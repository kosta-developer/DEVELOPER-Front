let url = new URL(location.href);
let seq = url.searchParams.get("lessonSeq");
let lessonSeq = Number(seq);

$(()=>{
    checkIntervalLogined();

    let $parent_classandtutee = $('div#classandtutee');
    let $origin_classandtuteelist= $('div#classandtuteelist').first()
    $origin_classandtuteelist.show()

    $.ajax({
        xhrFields: {
            withCredentials: true 
        },
        url:backURL+'mypage/tutor/completed/addreview/' + lessonSeq,
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(res) =>{
                //[1]완료된 수업정보
                $(res).each((index)=>{
                    let $copy_classandtuteelist = $origin_classandtuteelist.clone();
                   $copy_classandtuteelist.find('div.completedclass').html("["+(index+1)+"] "+res[index].lessonName.lessonName)
                   $copy_classandtuteelist.find('div.completedtutee').html("튜티 : "+res[index].username)
                   $copy_classandtuteelist.find('div.applyseq').html(res[index].applySeq.applySeq)
                    $parent_classandtutee.append($copy_classandtuteelist)
                })
                $origin_classandtuteelist.hide();
        },
        error : function(xhr){
            alert(xhr.status);
        }
    })

    // document.addEventListener("DOMContentLoaded", function() {
        $(document).on('click','.writebtn',function(event){
            event.preventDefault();  
            alert('클릭')
            let star = $('[name=rating]:checked').val();
            let applySeqRv = $('div.applyseq').text();
            let content = $('textarea#writeReview').val();
            let review = document.getElementById("writeReview").value;
            console.log("번호"+applySeqRv)
            console.log("별"+star);
            console.log("리뷰"+content);
            console.log(review);
            let data = {
                        applySeqRv:applySeqRv,
                        star:star,
                        review:content
                        }
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url : backURL+'mypage/tutor/completed/addreview/'+applySeqRv,
                method:'post',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify(data),
                success:function(response){
                    alert('후기를 등록했습니다!')
                    console.log('success:',response);
                    location.href=backURL+'mypage/tutor/completeddetail.html?lessonSeq='+lessonSeq;
                },
                error:function(xhr){
                    alert(xhr.status);
                    console.log('error'+xhr);
                }
            })
        })
    //   })
      
      
    // $(document).on('click','.writebtn',function(){ 
    //         alert('클릭')
    //         let star = $('[name=rating]:checked').val();
    //         let applySeqRv = $('div.applyseq').text();
    //         let content = $('textarea#writeReview').val();
    //         let review = document.getElementById("writeReview").value;
    //         console.log("번호"+applySeqRv)
    //         console.log("별"+star);
    //         console.log("리뷰"+content);
    //         console.log(review);
    //         let data = {
    //                     applySeqRv:applySeqRv,
    //                     star:star,
    //                     review:content
    //                     }

    //         $.ajax({
    //             xhrFields: {
    //                 withCredentials: true
    //             },
    //             url : backURL+'mypage/tutor/completed/addreview/'+applySeqRv,
    //             method:'post',
    //             contentType: "application/json; charset=utf-8",
    //             data:JSON.stringify(data),
    //             success:function(response){
    //                 alert('후기를 등록했습니다!')
    //                 console.log('success:',response);
    //                 location.href=backURL+'mypagetutorcompleteddetail.html?lessonSeq='+lessonSeq;
    //             },
    //             error:function(xhr){
    //                 alert(xhr.status);
    //                 console.log('error'+xhr);
    //             }
        
    //         })
    //         return false;
    
    //     })

})