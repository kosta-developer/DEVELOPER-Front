let url = new URL(location.href);
let seq = url.searchParams.get("lessonSeq");
let lessonSeq = Number(seq);
$(()=>{
    checkIntervalLogined();

    let $origin_completedclassreview= $('div#completedclassreview').first()
    let $origin_tuteelist=$('div#tuteelist').first()
    let $origin_endclasslist=$('div#endclasslist').first()

    let $parent_completedclassreview = $('div#completedClass');
    let $parent_jointutee = $('div#jointutee');
    let $parent_endclass = $('div#endclass');
    
    $origin_completedclassreview.show()
    $origin_tuteelist.show()
    $origin_endclasslist.show()

    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url:backURL+'mypage/tutor/completed/detail/' + lessonSeq,
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(res) =>{
                console.log(res);
                //[1]완료된 수업정보
                $(res.selectLessonDTO).each((index)=>{
                    let $copy_endclasslist = $origin_endclasslist.clone();
                   $copy_endclasslist.find('div.category').html("카테고리:"+res.selectLessonDTO[index].category)
                   $copy_endclasslist.find('div.lessonName').html("수업명:"+res.selectLessonDTO[index].lessonName)
                   $copy_endclasslist.find('div.people').html("정원:"+res.selectLessonDTO[index].people)
                   $copy_endclasslist.find('div.startCdate').html("시작일:"+res.selectLessonDTO[index].startCdate)
                   $copy_endclasslist.find('div.endCdate').html("종료일:"+res.selectLessonDTO[index].endCdate)
                   $copy_endclasslist.find('div.tutee').html("강사명:"+res.selectLessonDTO[index].tdto.udto.name)
                   $copy_endclasslist.find('div.imgPath').html(res.selectLessonDTO[index].imgPath)
                    $parent_endclass.append($copy_endclasslist)
                })
                $origin_endclasslist.hide();

                //[2]참여한 튜티목록 
                $(res.userAppliedLessonDTO).each((index)=> {
                    let $copy_tuteelist = $origin_tuteelist.clone();
                    $copy_tuteelist.find('div.tuteename').html(res.userAppliedLessonDTO[index].usersDTO.name);
                    $copy_tuteelist.find('div.lessonseq').html(res.userAppliedLessonDTO[index].lessonDTO.lessonSeq);
                    $parent_jointutee.append($copy_tuteelist);
                })
                $origin_tuteelist.hide();

                //[3]후기목록
                $(res.completedlessonReviewDTO).each((index)=> {
                    let $copy_completedclassreview = $origin_completedclassreview.clone();
                    $copy_completedclassreview.find('div.completedreview').html(res.completedlessonReviewDTO[index].review.review)
                    $copy_completedclassreview.find('div.completedstar').html(res.completedlessonReviewDTO[index].review.star)
                    $copy_completedclassreview.find('div.completedname').html(res.completedlessonReviewDTO[index].username);
                    // console.log($copy_completedclassreview);
                    $parent_completedclassreview.append($copy_completedclassreview);
                })
                $origin_completedclassreview.hide();
        },
        error : function(xhr){
            alert(xhr.status);
        }
    })

    $('#writereviewbtn').click(()=>{
        location.href='tutorcompleteaddreview.html?lessonSeq='+ lessonSeq;
    })
})
