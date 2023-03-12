$(()=>{
    
    let queryParams = new URLSearchParams(window.location.search);
    let lessonSeq = queryParams.get('lessonSeq');

    let url = "http://172.30.1.15:8888/developer/mypage/tutor/upcoming/detail/"+lessonSeq
    // let url = backURL + 'mypage/tutor/upcoming/detail/1';
    function lessondetail() {
        $.ajax({
            xhrFields: {
            withCredentials: true
            },   
            url : url,
            // data: data,
            success: function(jsonObj){
                console.log(jsonObj)
                console.log(jsonObj.llist[0])
                console.log(jsonObj.approveList[0])
                console.log(jsonObj.notYetList[0])

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
                console.log(jsonObj.llist[0].lessonName)
                $('.content-container>.comingDetail>.classlist>.classThumbnail>h2').html(jsonObj.llist[0].lessonName)
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
                let $origin = $('div.completed>.completedlist').first();
                let $parent = $('div.completed');
                
                $(jsonObj.approveList).each((index)=>{
                    let $copy = $origin.clone();
                    $copy.find('#name').html(jsonObj.approveList[index].usersDTO.name)
                    $parent.append($copy);
                
                });
                $origin.hide();
                //클래스 승인 튜티 END


                //클래스 미승인 튜티 START
                let $origin2 = $('div.applying>.applyinglist').first();
                let $parent2 = $('div.applying');
                
                $(jsonObj.notYetList).each((index)=>{
                    let $copy = $origin2.clone();

                    $copy.find('#applyingname').html(jsonObj.notYetList[index].usersDTO.name)
                    $copy.find('#applySeq').html(jsonObj.notYetList[index].applySeq)

                    $copy.append('<div class="applyingbutton"><input type="button" value= "승인" class="approveButton"></div>')
                    $copy.append('<div class="applyingbutton"><input type="button" value= "거절" class="refuseButton"></div>')
                    $parent2.append($copy);

                
                });
                $origin2.hide();

                //클래스 미승인 튜티 END

            }, 
            error: function(xhr){
                let jsonObj = JSON.parse(xhr.responseText);
                alert(jsonObj.msg);
            }
            
        })
        
    }

    //----수업수정버튼 클릭시 START----
    $(document).on('click','#classUpdate', (e)=>{
        let lessonSeq = $(e.target).parents('div.classDetail').find('div#lessonSeq').text();
        location.href = 'http://172.30.1.15:5500/html/mypage/tutor/update.html?lessonSeq='+lessonSeq;
    })
    //----수업수정버튼 클릭시 END----

    //----수업삭제버튼 클릭 시 START----
    $(document).on('click','div.classButton>#classdelete', (e)=>{
        
        console.log()
        let lessonSeq = $(e.target).parents('div.classDetail').find('div#lessonSeq').text();
        console.log('나와라 좀..'+lessonSeq)
    
        $.ajax({
            xhrFields: {
            withCredentials: true //크로스오리진을 허용!
            },
            // url : backURL + 'mypage/tutor/upcoming/detail/apply/'+applySeq,
            url :"http://172.30.1.15:8888/developer/mypage/tutor/upcoming/detail/delete/"+lessonSeq,
            method : 'PUT',
            success : function(){
                
                // location.href = frontURL + 'mypage/tutor/comingdetail'
                location.href = 'http://172.30.1.15:5500/html/mypage/tutor/comingdetail.html';
                lessondetail();

            },
            error : function(xhr){
                alert('오류'+ xhr.status)
            }
        })
    })
    //----수업삭제버튼 클릭 시 END---
    
    
    //----승인버튼 클릭 시 START----
    $(document).on('click','.approveButton', (e)=>{
        let applySeq = $(e.target).parents('div.applyinglist').find('div#applySeq').text();
        console.log('나와라 좀..'+applySeq)
    
        $.ajax({
            xhrFields: {
            withCredentials: true //크로스오리진을 허용!
            },
            // url : backURL + 'mypage/tutor/upcoming/detail/apply/'+applySeq,
            url :"http://172.30.1.15:8888/developer/mypage/tutor/upcoming/detail/apply/"+applySeq,
            method : 'PUT',
            success : function(){
                
                // location.href = frontURL + 'mypage/tutor/comingdetail'
                location.href = 'http://172.30.1.15:5500/html/mypage/tutor/comingdetail.html';
                lessondetail();

            },
            error : function(xhr){
                alert('오류'+ xhr.status)
            }
        })
    })
    //----승인버튼 클릭 시 END---

    //----거절버튼 클릭 시 START----
    $(document).on('click','.refuseButton', (e)=>{
        let applySeq = $(e.target).parents('div.applyinglist').find('div#applySeq').text();
        console.log('나와라 좀..'+applySeq)
    
        $.ajax({
            xhrFields: {
            withCredentials: true //크로스오리진을 허용!
            },
            // url : backURL + 'mypage/tutor/upcoming/detail/apply/'+applySeq,
            url :"http://172.30.1.15:8888/developer/mypage/tutor/upcoming/detail/notapply/"+applySeq,
            method : 'PUT',
            success : function(){
                
                // location.href = frontURL + 'mypage/tutor/comingdetail'
                location.href = 'http://172.30.1.15:5500/html/mypage/tutor/comingdetail.html';
                lessondetail();

            },
            error : function(xhr){
                alert('오류'+ xhr.status)
            }
        })
    })
    // ----거절버튼 클릭 시 END---

    //----수업 상세정보 클릭시 START
    $(document).on('click','#classDetail', (e)=>{
        console.log(lessonSeq)
        location.href = 'http://172.30.1.15:5500/html/lesson/detail.html?lessonSeq=' + lessonSeq;
        // location.href = frontURL + 'lesson/detail.html?lessonSeq=' + lessonSeq;
    })
    //----수업 상세정보 클릭시 END



    lessondetail();
    
});


