$(()=>{
    //--메뉴가 클릭되었을 때 할 일 START--

    $('div.member>div').click((e) => {
        let menu = $(e.target).attr('class')
        switch (menu) {
            case 'signup':
                location.href='./userCheckEmail.html'
                break;
            case 'hostSignup':
                location.href='./hostCheckEmail.html'
                break;
        }
        return false
    })
})
