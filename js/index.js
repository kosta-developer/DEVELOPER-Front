$(()=>{
    
    // checkIntervalLogined();
    let queryStr = location.search.substring(1) // ?뒤에 붙는 매개변수 값 반환 
    let arr = queryStr.split('=')

    let $banner = $(".banner-container").find("ul");

    let $bannerWidth = $banner.children().outerWidth();//배너 이미지의 폭
    let $bannerHeight = $banner.children().outerHeight(); // 높이
    let $bannerLength = $banner.children().length;//배너 이미지의 갯수
    let rollingId;
    rollingId = setInterval(function() { rollingStart(); }, 2000)

  

    //다시 맞추기 선택자
    if(arr[0] == 'menu'){
     console.log('메뉴', arr[1])
         switch(arr[1]){
         case 'lesson':
             $('header>nav>ul>li.lesson').click()
             break;
         case 'studycafe':
             $('header>nav>ul>li.studycafe').click()
             break;
         case 'community':
             $('header>nav>ul>li.community').click()
             break;
         case 'signup':
             $('header>nav>ul>li.signup').click()
             break;
         case 'login':
             $('header>nav>ul>li.login').click()
             break;     
         case 'logout':
             $('header>nav>ul>li.logout').click()
             break;      
         case 'tutorAdd':
             $('header>nav>ul>li.tutorAdd').click()
             break;      
         case 'myPage':
             $('header>nav>ul>li.myPage').click()
             break;      
         }
    }

    //--마우스 오버시 롤링 멈춤 / 마우스 아웃 다시시작 START
		$banner.mouseover(function(){
			//중지
			clearInterval(rollingId);
			$(this).css("cursor", "pointer");
		});
		//마우스 아웃되면 다시 시작
		$banner.mouseout(function(){
			rollingId = setInterval(function() { rollingStart(); }, 3000);
			$(this).css("cursor", "default");
		});

    //--마우스 오버시 롤링 멈춤 / 마우스 아웃 다시시작 END

    //--배너 롤링 START
    function rollingStart() {
        $banner.css("width", $bannerWidth * $bannerLength + "px");
        $banner.css("height", $bannerHeight + "px");
        $banner.animate({left: - $bannerWidth + "px"}, 5000, function() { //숫자는 롤링 진행되는 시간이다.
            //첫번째 이미지를 마지막 끝에 복사(이동이 아니라 복사)해서 추가한다.
            $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
            //뒤로 복사된 첫번재 이미지는 필요 없으니 삭제한다.
            $(this).find("li:first").remove();
            //다음 움직임을 위해서 배너 좌측의 위치값을 초기화 한다.
            $(this).css("left", 0);
            //이 과정을 반복하면서 계속 롤링하는 배너를 만들 수 있다.
        });
    }
    //--배너 롤링 END
   
    //--수업 리스트 출력 START
    let url = backURL + 'lesson/listbydate'
    let $origin = $('div.lessonlistorigin').first()
    
    $origin.show()

    function listLesson() {
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
         },
        url: url,
        success: function(jsonObj){
            console.log(jsonObj)
            let $parent = $('div.lessonlist');

            $(jsonObj).each((index, item)=>{

               let $copy = $origin.clone()
               let $imgObj = $('<img id="mainLessonImg">')
               $imgObj.attr('src', '../images/lessonimg.jpg')
               $copy.find('div.lessonImg').empty().append($imgObj)
               $copy.find('div.lessonSeq').html(item.lessonSeq) //우선 display:hidden
               $copy.find('div.lessonName').html(item.lessonName)
               $copy.find('div.lessonImgPath').html(item.imgPath)
               if(item.price == 0){
                $copy.find('div.lessonPrice').html('무료')
               } else if(item.category != 0){
                $copy.find('div.lessonPrice').html(item.price+'원')
               } 
               $parent.append($copy)
            }) 
            $origin.hide()
        },
        error: function(xhr){
            alert(xhr.status)  //에러메시지다시해보기
        }
    })
}

//--수업 리스트 출력 END


//--커뮤니티 리스트 출력 START
let url2 = backURL + 'board/listbydate'
let $origin2 = $('div.communityListOrigin').first()
$origin2.show()

function listCommunity() {
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
         },
        url: url2,
        success: function(jsonObj){
            console.log(jsonObj)
            let $parent = $('div.communityList');

            $(jsonObj).each((index, item)=>{

               let $copy = $origin2.clone()
               $copy.find('div.postSeq').html(item.postSeq) //우선 display:hidden
               if(item.category == 0){
                $copy.find('div.postCategory').html('[Q/A]')
               } else if(item.category == 1){
                $copy.find('div.postCategory').html('[스터디모집]')
               } else if(item.category == 2){
                $copy.find('div.postCategory').html('[자유게시판]')
               }
               $copy.find('div.postTitle').html(item.title) 
               $copy.find('div.postContent').html(item.content)
               $copy.find('div.nickname').html('작성자: ' + item.nickname)
               $copy.find('span.postCDate').html('작성일: '+ item.cDate)
               $copy.find('span.postRecommend').html('추천수: '+ item.recommend)
               $copy.find('span.postCnt').html('조회수: '+ item.cnt)
            //    let $imgObj = $('<img id="mainCommunityImg">')
            //    $imgObj.attr('src', '../images/communityimg.jpg')
            //    $copy.find('div.postImg').empty().append($imgObj)
               $parent.append($copy)
            }) 
            $origin2.hide()
        },
        error: function(xhr){
            alert(xhr.status)
        }

    })
}

//--커뮤니티 리스트 출력 END

listLesson();
listCommunity();
 })