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
                let $copy = $origin.clone();

                lessonSeq = jsonObj[0].lesson[i].lessonSeq
                lImgPath = jsonObj[0].lesson[i].imgPath
                lessonName = jsonObj[0].lesson[i].lessonName
                location = jsonObj[0].lesson[i].location
                price = jsonObj[0].lesson[i].price
                if (price == 0) {
                    price = '무료';
                }

                //=================[이미지 다운로드 START]==================
                $.ajax({
                    xhrFields: {
                        responseType: "blob",
                    },
                    cashe: false,
                    url: backURL + "download/lesson",
                    method: "get",
                    data: "imgPath=" + lImgPath + "&opt=inline&type=1",
                    success: function (result) {
                        console.log(result);
                        let blobStr = URL.createObjectURL(result);
                        console.log($copy.find("img.lImgPath"));
                        $copy.find("img.lImgPath").attr("src", blobStr);


                        //=================[이미지 다운로드 START]==================
                        let imgPath = jsonObj[0].imgPath;
                        $.ajax({
                            xhrFields: {
                                responseType: "blob",
                            },
                            cashe: false,
                            url: backURL + "download/tutor",
                            method: "get",
                            data: "imgPath=" + imgPath + "&opt=inline&type=1",
                            success: function (result) {
                                console.log(result);
                                let blobStr = URL.createObjectURL(result);
                                $('#tutor >#tImgPath').attr("src", blobStr);
                            },
                        });
                        //=================[이미지 다운로드 END]==================

                    },
                });
                //=================[이미지 다운로드 END]==================

                console.log(lessonName)
            
                $copy.find('div.lessonSeq').html(lessonSeq);
                $copy.find('div.lessonName').html("<h3>" + lessonName + "</h3>");
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


});