let backURL = "http://172.30.1.34:8888/developer/"; //192.168.0.20
let frontURL = "http://172.30.1.34:5500/html/"; //192.168.219.102

//바꿔야함 맞춰서 다시

//--[회원] 로그인상태의 메뉴들 보여주기 함수 START--
    function showMenuAtMemberLogined() {
        $('header>nav>ul>li.lesson').show()
        $('header>nav>ul>li.studycafe').show()
        $('header>nav>ul>li.community').show();
        $('header>nav>ul>li.signup').hide();
        $('header>nav>ul>li.login').hide();
        $('header>nav>ul>li.logout').show();
        $('header>nav>ul>li.tutorAdd').show();
        $('header>nav>ul>li.myPage').show();
    }
//--[회원] 로그인상태의 메뉴들 보여주기 함수 END--

//--[호스트] 로그인상태의 메뉴들 보여주기 함수 START--
    function showMenuAtHostLogined() {
        $('header>nav>ul>li.lesson').hide()
        $('header>nav>ul>li.studycafe').show()
        $('header>nav>ul>li.community').hide();
        $('header>nav>ul>li.signup').hide();
        $('header>nav>ul>li.login').hide();
        $('header>nav>ul>li.logout').show();
        $('header>nav>ul>li.tutorAdd').hide();
        $('header>nav>ul>li.myPage').hide();
    }
//--[호스트] 로그인상태의 메뉴들 보여주기 함수 END--

//--로그아웃상태의 메뉴들 보여주기 함수 START--
    function showMenuAtLogouted() {
        $('header>nav>ul>li.lesson').show()
        $('header>nav>ul>li.studycafe').show()
        $('header>nav>ul>li.community').show();
        $('header>nav>ul>li.signup').show();
        $('header>nav>ul>li.login').show();
        $('header>nav>ul>li.logout').hide();
        $('header>nav>ul>li.tutorAdd').hide();
        $('header>nav>ul>li.myPage').hide();
    }
//--로그아웃상태의 메뉴들 보여주기 함수 END--

//--현재 로그인/로그아웃 상태를 요청하는 함수 START--
function checkLogined() {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + '우리가 만든 주소로',
        success: function (responseObj) {
            if (responseObj.status == 1) {
                showMenuAtLogined();
            } else {
                showMenuAtLogouted();
            }
        },
    });
}
//--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 END--

//--5초간격으로 로그인여부확인하기 함수 START--    
    function checkIntervalLogined() {
        checkLogined();
        window.setInterval(checkLogined, 5000);
    }
 //--5초간격으로 로그인여부확인하기 함수 END--


 $(()=>{
    //--메뉴가 클릭되었을 때 할 일 START--
    $('header>nav>ul>li').click((e) => {
        $('header>nav>ul>li').css('background-color', '#fff').css('color', '#000')

        $(e.target).css('background-color', '#2C2A29').css('color', '#fff')
        let menu = $(e.target).attr('class')
        switch (menu) {
            case 'lesson':
                $('section').load('./lesson.html')
                break;
            case 'studycafe':
                $('section').load('./studycafe.html')
                break;
            case 'community':
                $('section').load('./community.html')
                break;
            case 'signup':
                $('section').load('./signup.html')
                break;   
            case 'login' :
                $('section').load('./login.html')
                break;     
            case 'logout':
                alert("로그아웃클릭됨")
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: backURL + '우리가 만든 주소',
                    success: function(){
                        showMenuAtLogouted()
                        location.href = frontURL
                    }
                })
                break;    
            case 'tutorAdd' :
                $('section').load('./tutorAdd.html')
                break;         
            case 'myPage' :
                $('section').load('./myPage.html')
                break;         
        }
        return false
    })
    //--메뉴가 클릭되었을 때 할 일 END--

    //--로고가 클릭되었을 때 할 일 START--
    $('header>div.headerImg').click(() => {
        location.href = frontURL
    })
    //--로고가 클릭되었을 때 할 일 END--
})