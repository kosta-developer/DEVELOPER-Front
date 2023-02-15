//=== 수업 목록 보여주기 START ===
$(()=>{
    let url = backURL + 'lesson/lessonlist';
    let data = "category=1&priceFilter=1&starFilter=2";

    $.ajax({
        url : url,
        data: data,
        success: function(jsonObj){
            console.log(jsonObj)

            let $origin = $('#lesson').first();
            let $parent = $('#lessonList');
            $(jsonObj).each((index)=>{
                let category = jsonObj[index].category;
                if(category == 0){
                    category = '프로그래밍 언어';
                } else if(category == 1){
                    category = '웹 개발';
                } else if(category == 2){
                    category = '앱 개발';
                } else if(category == 3){
                    category = '보안/네트워크';
                } else if(category == 4){
                    category = '데이터';
                }
                
                let $copy = $origin.clone();
                $copy.find('div.lCategory').html(category)
                let $imgObj = $('<img>')
                $imgObj.attr('class', 'lessonImg');
                $imgObj.attr('src', '/images/' + jsonObj[index].imgPath);
                $copy.find('div.img').empty().append($imgObj);
                $copy.find('div.lessonName').html("<h6>" + jsonObj[index].lessonName + "</h6>")
                $copy.find('div.tutorName').html(jsonObj[index].tutorVO.usersVO.name)
                
                let price = jsonObj[index].price;
                if(price == 0){
                    price = '무료'
                }
                $copy.find('div.price').html(price)
                $copy.find('div.cDate').html(jsonObj[index].startCdate + " ~ " + jsonObj[index].endCdate)

                $parent.append($copy);
            });
            $origin.hide();
        }, 
        error: function(xhr){
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 수업 목록 보여주기 END ===

//=== 로고/수업 이미지/이름/강사명 누르면 해당 페이지로 이동 START ===
$(document).on('click', '#logo', function(){
    location.href = frontURL + 'index.html';
});
$(document).on('click', '#lesson > div.img', function(){
    location.href= frontURL + 'lesson/detail.html';
});
$(document).on('click', '#lesson > div.lessonName', function(){
    location.href= frontURL + 'lesson/detail.html';
});
$(document).on('click', '#lesson > div.tutorName', function(){
    location.href= frontURL + 'lesson/tutorinfo.html';
});
//=== 로고/수업 이미지/이름/강사명 누르면 해당 페이지로 이동 END ===