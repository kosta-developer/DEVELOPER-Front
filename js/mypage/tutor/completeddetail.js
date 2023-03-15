let url = new URL(location.href);
let seq = url.searchParams.get("lessonSeq");
let lessonSeq = Number(seq);
$(()=>{
    userCheckIntervalLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));
    
    let $origin_completedclassreview= $('div#completedclassreview').first()
    let $origin_tuteelist=$('div#tuteelist').first()
    let $origin_endclasslist=$('div#endclasslist').first()
    let $origin_endclassimg=$('div#endclassimg').first()

    let $parent_completedclassreview = $('div#completedClass');
    let $parent_jointutee = $('div#jointutee');
    let $parent_endclass = $('div#endclass');
    let $parent_endclassimg = $('div#endclass');
    $origin_completedclassreview.show()
    $origin_tuteelist.show()
    $origin_endclasslist.show()
    $origin_endclassimg.show()

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
                    
                    let imgPath = res.selectLessonDTO[index].imgPath;
                    console.log(imgPath);

                    if (res.selectLessonDTO[index].category == 0) {
                        temp = "프로그래밍 언어";
                    } else if (res.selectLessonDTO[index].category == 1) {
                        temp = "웹개발";
                    } else if (res.selectLessonDTO[index].category == 2) {
                        temp = "앱개발"
                    }else if (res.selectLessonDTO[index].category == 3) {
                        temp = "보안/네트워크"
                    }else if (res.selectLessonDTO[index].category == 4) {
                        temp = "데이터"
                    }
                    //--썸네일 이미지 다운로드 START--
                    $.ajax({
                        xhrFields: {
                            responseType: "blob",
                        },
                        cache: false,
                        url: backURL + "download/mypage/complete",
                        method: "get",
                        data: "imgPath=" + imgPath + "&opt=inline&type=1",
                        success: function (result) {
                            console.log(result);
                            let blobStr = URL.createObjectURL(result);
                            $copy_endclassimg.find("#endclass>#endclassimg>div.imgPath>img").attr("src", blobStr);
                        },
                    });
                    let $copy_endclasslist = $origin_endclasslist.clone();
                    let $copy_endclassimg = $origin_endclassimg.clone();
                   $copy_endclasslist.find('div.category').html("카테고리:"+temp)
                   $copy_endclasslist.find('div.lessonName').html("수업명:"+res.selectLessonDTO[index].lessonName)
                   $copy_endclasslist.find('div.people').html("정원:"+res.selectLessonDTO[index].people)
                   $copy_endclasslist.find('div.startCdate').html("시작일:"+res.selectLessonDTO[index].startCdate)
                   $copy_endclasslist.find('div.endCdate').html("종료일:"+res.selectLessonDTO[index].endCdate)
                   $copy_endclasslist.find('div.tutee').html("강사명:"+res.selectLessonDTO[index].tdto.udto.name)
                   $copy_endclassimg.find('div.imgPath').html('<img width="200px" height="150px"'+res.selectLessonDTO[index].imgPath)
                    $parent_endclassimg.append($copy_endclassimg)
                    $parent_endclass.append($copy_endclasslist)

                })

                $origin_endclassimg.hide();
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
                    let starcnt=""   
                    for (i = 0; i<= res.completedlessonReviewDTO[index].review.star ; i++){
                        starcnt="🌟".repeat(i);
                        } 
                    
                    let $copy_completedclassreview = $origin_completedclassreview.clone();
                    $copy_completedclassreview.find('div.completedreview').html(res.completedlessonReviewDTO[index].review.review)
                    $copy_completedclassreview.find('div.completedstar').html(starcnt)
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
        location.href='./completeaddreview.html?lessonSeq='+ lessonSeq;
    })
})
