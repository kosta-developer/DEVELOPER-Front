$(()=>{
    
    let url = backURL + 'lesson/lessondetail';
    let data = "lessonSeq=4";
    function lessondetail() {
        $.ajax({
            url : url,
            data: data,
            success: function(jsonObj){
                let category = jsonObj.category;
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
                console.log(jsonObj.lessonName)
                $('.content-container>.ongoingDetail>.classlist>.classThumbnail>.lessonName').html(jsonObj.lessonName)
                $('.content-container > div > div.classlist > div.classDetail > ul > li.name').html('<h4>'+"강 사 명 : "+jsonObj.tutorVO.usersVO.name+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.location').html('<h4>'+"위&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;치 : "+jsonObj.location+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.startDate').html('<h4>'+"시작날짜 : "+jsonObj.startCdate+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.endDate').html('<h4>'+"종료날짜 : "+jsonObj.endCdate+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.category').html('<h4>'+"카테고리 : "+category+'</h4>')
                $('.content-container > div > div.classlist > div.classDetail > ul > li.people').html('<h4>'+"모집인원 : "+jsonObj.people+'</h4>')
                
                
            }, 
            error: function(xhr){
                let jsonObj = JSON.parse(xhr.responseText);
                alert(jsonObj.msg);
            }
    
        })
    
    }

    
    let url2 = backURL + 'appliedlesson/getlessonapplyusers1';
    let data2 = "applyOk=1&lessonSeq=4";
    function tuteelist() {     
        $.ajax({
            url : url2,
            data: data2,
            success: function(jsonObj){
                console.log(jsonObj)
                let $origin = $('div.tuteelist>.completed').first();
                let $parent = $('div.tuteelist');
                
                $(jsonObj).each((index)=>{
                    let $copy = $origin.clone();
                    $copy.find('#name').html(jsonObj[index].name)
                    $parent.append($copy);
                
                });
                $origin.hide();
                
    
            }, 
            error: function(xhr){
                let jsonObj = JSON.parse(xhr.responseText);
                alert(jsonObj.msg);
                alert('실패했습ㅁ니다')
            }
    
        }) 
    }
    lessondetail();
    tuteelist();
  });

