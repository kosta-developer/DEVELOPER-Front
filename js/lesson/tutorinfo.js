//=== 튜터 상세 내용 보여주기 START ===
$(()=>{
    let url = backURL + 'lesson/tutorinfo';
    let data = "userId=autumn";
    
    $.ajax({
        url : url,
        data: data,
        success: function(jsonObj){
            console.log(jsonObj) 
            $('#tImgPath').attr('src','/images/' + jsonObj[0].tutorVO.imgPath)
            $('#tutor-container > div.tutorName').html(jsonObj[0].tutorVO.usersVO.name)
            $('#tutor-container > div.info').html(jsonObj[0].tutorVO.info)
            
            let star;
            if(2.0 > jsonObj[0].tutorVO.starAvg && jsonObj[0].tutorVO.starAvg >= 0){
                star = "⭐️";
            } else if(3.0 > jsonObj[0].tutorVO.starAvg && jsonObj[0].tutorVO.starAvg >= 2.0){
                star = "⭐️⭐️";
            } else if(4.0 > jsonObj[0].tutorVO.starAvg  && jsonObj[0].tutorVO.starAvg >= 3.0){
                star = "⭐️⭐️⭐️";
            } else if(5.0 > jsonObj[0].tutorVO.starAvg && jsonObj[0].tutorVO.starAvg >= 4.0){
                star = "⭐️⭐️⭐️⭐️";
            } else if (jsonObj[0].tutorVO.starAvg && jsonObj[0].tutorVO.starAvg >= 5.0){
                star = "⭐️⭐️⭐️⭐️⭐️";
            } 
            $('#tutor-container > div.starAvg').html(star + " (" +jsonObj[0].tutorVO.starAvg+ ")");
            
            let $origin = $('.tutorLesson').first();
            let $parent = $('#tutorLessonList');
            $(jsonObj).each((index)=>{
                let lImgPath = jsonObj[index].imgPath
                let lessonName = jsonObj[index].lessonName
                let location = jsonObj[index].location
                
                let price = jsonObj[index].price
                if(price == 0){
                    price = '무료';
                }
                
                let $copy = $origin.clone();
                let $imgObj = $('<img>')
                $imgObj.attr('class', 'lessonImg');
                $imgObj.attr('src', '/images/' + lImgPath);
                $copy.find('div.lImgPath').empty().append($imgObj);
                $copy.find('div.lessonName').html("<h6>"+ lessonName +"</h6>");
                $copy.find('div.location').html(location);
                $copy.find('div.price').html(price);

                $parent.append($copy);
            })
            $origin.hide();
        }, 
        error: function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 튜터 상세 내용 보여주기 END ===

//=== 수업 이미지/이름 누르면 상세 페이지로 이동 START ===
$(document).on('click', '.tutorLesson > .lImgPath', function(){
    location.href= frontURL + 'lesson/detail.html';
});
$(document).on('click', '.tutorLesson > .lessonName', function(){
    location.href= frontURL + 'lesson/detail.html';
});
//=== 수업 이름 누르면 상세 페이지로 이동 END ===