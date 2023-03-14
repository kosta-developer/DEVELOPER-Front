//지원
let backURL = "http://192.168.0.34:8888/developer/";
let frontURL = "http://192.168.0.34:5500/html/";

$(() => {
    showMenuAtLogouted()
    //--로그아웃 클릭되었을 때 할 일 START--
    $('div.nav-container > nav > ul > li.logout').click((e) => {
        // alert("로그아웃클릭됨")
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'users/logout',
            success: function () {
                showMenuAtLogouted()
                sessionStorage.removeItem("logined");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("hostlogined")
                sessionStorage.removeItem("hostready");
                // alert("로그아웃성공")
                location.href = frontURL + 'index.html'
            }
        })
        return false
    })
    //---로그아웃 클릭되었을 때 할 일 END--

    //--로고가 클릭되었을 때 할 일 START--
    $('div.nav-container>img#logo').click(() => {
        location.href = frontURL + 'index.html'
    })
    //--로고가 클릭되었을 때 할 일 END--

});


//--로그인상태의 메뉴들 보여주기 함수 START--
function showMenuAtMemberLogined() {
    $('div.nav-container >nav > ul > li.lesson').show()
    $('div.nav-container >nav > ul > li.studyroom').show()
    $('div.nav-container >nav > ul > li.board').show()
    $('div.nav-container >nav > ul > li.signup').hide()
    $('div.nav-container >nav > ul > li.login').hide()
    $('div.nav-container >nav > ul > li.logout').show()

    if(sessionStorage.getItem("role") == 1){
        $('div.nav-container >nav > ul > li.myPage').show()
        $('div.nav-container >nav > ul > li.tutorAdd').hide();
        $('div.nav-container >nav > ul > li.lessonAdd').show()
        $('div.nav-container >nav > ul > li.adminPage').hide()
    } else if(sessionStorage.getItem("role") == 2){
        $('div.nav-container >nav > ul > li.myPage').show()
        $('div.nav-container >nav > ul > li.tutorAdd').show();
        $('div.nav-container >nav > ul > li.lessonAdd').hide()
        $('div.nav-container >nav > ul > li.adminPage').hide()
    } else if(sessionStorage.getItem("role") == 9){
        $('div.nav-container >nav > ul > li.myPage').hide()
        $('div.nav-container >nav > ul > li.tutorAdd').hide();
        $('div.nav-container >nav > ul > li.lessonAdd').hide()
        $('div.nav-container >nav > ul > li.adminPage').show()
    }
}
//--[회원] 로그인상태의 메뉴들 보여주기 함수 END--


//--로그아웃상태의 메뉴들 보여주기 함수 START--
function showMenuAtLogouted() {
    $('div.nav-container >nav > ul > li.lesson').show()
    $('div.nav-container >nav > ul > li.studyroom').show()
    $('div.nav-container >nav > ul > li.board').show()
    $('div.nav-container >nav > ul > li.signup').show()
    $('div.nav-container >nav > ul > li.login').show()
    $('div.nav-container >nav > ul > li.tutorAdd').hide()
    $('div.nav-container >nav > ul > li.lessonAdd').hide()
    $('div.nav-container >nav > ul > li.myPage').hide()
    $('div.nav-container >nav > ul > li.logout').hide()
    $('div.nav-container >nav > ul > li.adminPage').hide()
}
//--로그아웃상태의 메뉴들 보여주기 함수 END--


//--현재 로그인/로그아웃 상태를 요청하는 함수 START--
function userCheckLogined() {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'users/checklogined',
        success: function (responseObj) {
            //console.log(responseObj)
            if (responseObj == 1) {
                //alert(responseObj)
                showMenuAtMemberLogined();
            } else {
                showMenuAtLogouted();
            }
        }
    });
}
//--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 END--

//--5초간격으로 로그인여부확인하기 함수 START--    
function userCheckIntervalLogined() {
    userCheckLogined();
    window.setInterval(userCheckLogined, 5000);
}
//--5초간격으로 로그인여부확인하기 함수 END--