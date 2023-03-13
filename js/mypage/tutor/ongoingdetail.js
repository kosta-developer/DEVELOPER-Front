$(()=>{
    userCheckIntervalLogined();
    let queryParams = new URLSearchParams(window.location.search);
    let lessonSeq = queryParams.get('lessonSeq');

    let url = backURL + 'mypage/tutor/ongoing/detail/'+lessonSeq;
    // let url = "http://172.30.1.15:8888/developer/mypage/tutor/ongoing/detail/"+lessonSeq


    function lessondetail() {
        $.ajax({
            xhrFields: {
            withCredentials: true
            },   
            url : url,
            success: function(jsonObj){

                ////클래스 정보 START
                let category = jsonObj.llist[0].category;
                if(category == 0){
                    category = '프로그래밍 언어';
                } else if(category == 1){
                    category = '웹 개발 ';
                } else if(category == 2){
                    category = '앱 개발';
                } else if(category == 3){
                    category = '보안/네트워크';
                } else if(category == 4){
                    category = '데이터';
                }
                console.log(jsonObj)
                console.log(jsonObj.llist[0].category)
                $('.content-container>.ongoingDetail>.classlist>.classThumbnail>.lessonName').html(jsonObj.llist[0].lessonName)
                $('.content-container > div > div.classlist > div.classDetail > ul > li.name').html('<h4>'+"강 사 명 : "+jsonObj.llist[0].tdto.udto.name+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.location').html('<h4>'+"위&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;치 : "+jsonObj.llist[0].location+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.startDate').html('<h4>'+"시작날짜 : "+jsonObj.llist[0].startCdate+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.endDate').html('<h4>'+"종료날짜 : "+jsonObj.llist[0].endCdate+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.category').html('<h4>'+"카테고리 : "+category+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.people').html('<h4>'+"모집인원 : "+jsonObj.llist[0].people+'</h4>')
                
                //수업 삭제, 수정, 상세정보 이동을 위한 lessonSeq값 뽑아내기
                $('#lessonSeq').html(jsonObj.llist[0].lessonSeq)
                //클래스 정보 END

                //클래스 승인 튜티 START
                let $origin = $('div.completed').first();
                let $parent = $('div.tuteelist');
                
                $(jsonObj.alList).each((index)=>{
                    let $copy = $origin.clone();
                    console.log(jsonObj.alList[index].usersDTO.name)
                    $copy.find('#name').html(jsonObj.alList[index].usersDTO.name)
                    $parent.append($copy);
                
                });
                $origin.hide();
                //클래스 승인 튜티 END
                let imgPath = jsonObj.llist[0].imgPath; 
                console.log('이미지패스는'+imgPath)

            $.ajaxSetup({
            cache: false
            });

            let $img = $('div.imgbox');

            $.ajax({
                xhrFields: {
                    responseType: "blob",
                },
                cache: false, // 캐시 방지
                url: backURL + "download/lesson",
                method: "get",
                data: {
                    imgPath: imgPath,
                    opt: "inline",
                    type: 1
                },
                // data: "imgPath=" + imgPath + "&opt=inline&type=1",
                success: function (result) {
                    console.log(result);
                    let blobStr = URL.createObjectURL(result);
                    $img.find("img").attr("src", blobStr);
                },
            });
                
            }, 
            error: function(xhr){
                let jsonObj = JSON.parse(xhr.responseText);
                alert(jsonObj.msg);
            }
    
        })
    
    }

    //----수업 상세정보 클릭시 START
    $(document).on('click','#classDetail', (e)=>{
        console.log(lessonSeq)
        // location.href = 'http://172.30.1.15:5500/html/lesson/detail.html?lessonSeq=' + lessonSeq;
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    })
    //----수업 상세정보 클릭시 END



    lessondetail();
  });

