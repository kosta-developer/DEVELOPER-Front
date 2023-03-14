let data; //받아온 수업 목록 다 받아주는 배열

$(() => {
    userCheckIntervalLogined()

    //=== 처음 페이지 진입시, 전체 수업 목록 보여주기 START ===
    let url = backURL + 'lesson/';
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {     
            // if(jsonObj.length<6){
            //     $('#load').hide();
            // }       
            console.log(jsonObj)
            data = jsonObj;
            dataList(data);
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 처음 페이지 진입시, 전체 수업 목록 보여주기 END ===


    //=== 수업 이미지/이름누르면 해당 페이지로 이동 START ===
    $("#lessonList").on('click', 'div.lessonName', (e) => {
        let lessonSeq = $(e.target).parents('#lesson').find('div.lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    });
    $("#lessonList").on('click', 'div.img', (e) => {
        let lessonSeq = $(e.target).parents('#lesson').find('div.lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    });
    //=== 수업 이미지/이름누르면 해당 페이지로 이동 END ===
});


//===  값꺼내주기 START ===
function dataList(list) {
    console.log
    let $origin = $('#lesson').first();
    let $parent = $('#lessonList');
    list.forEach(item => {
        console.log(item);
        let lessonSeq = item["lessonSeq"];
        let category = item["category"];
        let imgPath = item["imgPath"];
        let lessonName = item["lessonName"];
        let applyStartDate = item["applyStartDate"];
        let applyEndDate = item["applyEndDate"];
        let startDate = item["startDate"];
        let endDate = item["endDate"];
        let price = item["price"];

        if (category == 0) {
            category = '프로그래밍 언어';
        } else if (category == 1) {
            category = '웹 개발';
        } else if (category == 2) {
            category = '앱 개발';
        } else if (category == 3) {
            category = '보안/네트워크';
        } else if (category == 4) {
            category = '데이터';
        }

        if (price == 0) {
            price = '무료'
        }

        console.log(imgPath);
        //=================[이미지 다운로드 START]==================
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            cashe: false,
            url: backURL + "download/lesson",
            method: "get",
            data: "imgPath=" + imgPath + "&opt=inline&type=1",
            success: function (result) {
                console.log(result);
                let blobStr = URL.createObjectURL(result);
                $copy.find("img.lessonImg").attr("src", blobStr);
            },
        });
        //=================[이미지 다운로드 END]==================

        let $copy = $origin.clone()
        $copy.show()
        $copy.find('div.lessonSeq').html(lessonSeq)
        $copy.find('div.lCategory').html(category)
        let $imgObj = $('<img>')
        $imgObj.attr('class', 'lessonImg');
        $imgObj.attr('src', '/images/' + imgPath);
        $copy.find('div.img').empty().append($imgObj);
        $copy.find('div.lessonName').html("<h2>" + lessonName + "</h2>")
        $copy.find('div.startDate').html("수강기간: " + startDate + " ~ " + endDate)
        $copy.find('div.applyDate').html("신청 마감일 ➡️ " + applyEndDate)
        $copy.find('div.price').html(price);

        $parent.append($copy);
    })
    $origin.hide();
};
//=== 값꺼내주기 END ===



//===  카테고리별 목록 보여주기 START ===
function listByCategory(event) {
    console.log(event.target.value);
    let $parent = $('#lessonList');
    let $origin = $('#lesson').first();
    let cate = event.target.value;
    $parent.empty();
    $parent.append($origin);
    switch (cate) {
        case 0:
            let cat0 = data.filter((obj) => {
                return obj.category == 0;
            })
            console.log(cat0);
            console.log('--------');
            dataList(cat0);
            break;
        case 1:
            let cat1 = data.filter((obj) => {
                return obj.category == 1;
            })
            console.log(cat1);
            console.log('--------');
            dataList(cat1);
            break;
        case 2:
            let cat2 = data.filter((obj) => {
                return obj.category == 2;
            })
            console.log(cat2);
            console.log('--------');
            dataList(cat2);
            break;
        case 3:
            let cat3 = data.filter((obj) => {
                return obj.category == 3;
            })
            console.log(cat3);
            console.log('--------');
            dataList(cat3);
            break;
        case 4:
            let cat4 = data.filter((obj) => {
                return obj.category == 4;
            })
            console.log(cat4);
            console.log('--------');
            dataList(cat4);
            break;
        case 5:
            dataList(data);
            break;
    }
}
//=== 카테고리별 목록 보여주기 END ===

//===  검색 결과 목록 보여주기 START ===
//=== 검색 결과 목록 보여주기 END ===




