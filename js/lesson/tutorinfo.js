$(() => {

    userCheckIntervalLogined()
    //=== 튜터 상세 내용 보여주기 START ===
    let tutorId = location.search.substring(1).split('?');
    let url = backURL + 'tutor/' + tutorId;

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)
            $('#tImgPath').attr('src', '/images/' + jsonObj[0].imgPath)
            $('#tutor-container > div.tutorName').html(jsonObj[0].name)
            $('#tutor-container > div.info').html(jsonObj[0].info)

            let star;
            if (2.0 > jsonObj[0].starAvg && jsonObj[0].starAvg >= 0) {
                star = "⭐️";
            } else if (3.0 > jsonObj[0].starAvg && jsonObj[0].starAvg >= 2.0) {
                star = "⭐️⭐️";
            } else if (4.0 > jsonObj[0].starAvg && jsonObj[0].starAvg >= 3.0) {
                star = "⭐️⭐️⭐️";
            } else if (5.0 > jsonObj[0].starAvg && jsonObj[0].starAvg >= 4.0) {
                star = "⭐️⭐️⭐️⭐️";
            } else if (jsonObj[0].starAvg && jsonObj[0].starAvg >= 5.0) {
                star = "⭐️⭐️⭐️⭐️⭐️";
            }
            $('#tutor-container > div.starAvg').html(star + " (" + jsonObj[0].starAvg + ")");

            let $origin = $('.tutorLesson').first();
            let $parent = $('#tutorLessonList');

            let lImgPath;
            let lessonName;
            let location;
            let price;
            let lessonSeq;

            $(jsonObj[0].lesson).each((i) => {
                lessonSeq = jsonObj[0].lesson[i].lessonSeq
                lImgPath = jsonObj[0].lesson[i]
                lessonName = jsonObj[0].lesson[i].lessonName
                location = jsonObj[0].lesson[i].location
                price = jsonObj[0].lesson[i].price
                if (price == 0) {
                    price = '무료';
                }
                console.log(lessonName)
                let $copy = $origin.clone();
                let $imgObj = $('<img>')
                $imgObj.attr('class', 'lessonImg');
                $imgObj.attr('src', '/images/' + lImgPath);
                $copy.find('div.lImgPath').empty().append($imgObj);
                $copy.find('div.lessonSeq').html(lessonSeq);
                $copy.find('div.lessonName').html("<h6>" + lessonName + "</h6>");
                $copy.find('div.location').html(location);
                $copy.find('div.price').html(price);
                console.log("----");
                $parent.append($copy);
            })

            $origin.hide();
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 튜터 상세 내용 보여주기 END ===


    //=== 수업 이미지/이름 누르면 상세 페이지로 이동 START ===
    $('#tutorLessonList').on('click', 'div.lImgPath', (e) => {
        let seq = $(e.target).parents('div.tutorLesson').find('div.lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + seq;
    });
    $('#tutorLessonList').on('click', 'div.lessonName', (e) => {
        let seq = $(e.target).parents('div.tutorLesson').find('div.lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + seq;
    });
    //=== 수업 이름 누르면 상세 페이지로 이동 END ===


});