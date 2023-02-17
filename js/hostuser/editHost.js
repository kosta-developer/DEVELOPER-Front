$(() => {

    //----정보출력 START----
    let url = backURL + 'hostuser/infohost'
    let data = location.search.substring(1);

    //TO DO:아이디는 나중에 세션아이디로 설정하기
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        data:'hostId=suho522',
        success: function(jsonObj){
            console.log(jsonObj)
           let $hostInfo = $('div.detail-content-box');
           $hostInfo.find('input#hostuser-id').val(jsonObj.hostId)
           $hostInfo.find('input#hostuser-pwd').val(jsonObj.pwd)
           $hostInfo.find('input#hostuser-num').val(jsonObj.num)
           $hostInfo.find('input#hostuser-name').val(jsonObj.name)
           $hostInfo.find('input#hostuser-tel').val(jsonObj.tel)
           $hostInfo.find('input#hostuser-email').val(jsonObj.email)
        },  
        error: function(xhr){
            alert(xhr.status)
        }
    })
    
//--취소버튼 클릭 시 할일 START--
$('#content-wrap > div > div.content-container > div.detail-content-box > div.info-button > input[type=button]:nth-child(1)').click((e) => {
    location.href = frontURL + 'hostIndex.html'
})
//--취소버튼 클릭 시 할일 END--


    //기타 안한 버튼 처리 하기

})