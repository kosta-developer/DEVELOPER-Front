$(() => {   
 
    //----정보출력 START----
    let url = backURL + 'studyroom/infohostandcafe'
    let data = location.search.substring(1);

    //TO DO:아이디는 나중에 세션아이디로 설정하기
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        data: 'hostId=suho522',
        success: function (jsonObj) {

            console.log(jsonObj)
            let $hostInfo = $('#host-infomation-box');

            $hostInfo.find('div#business-number').html(jsonObj.hostUserVO.num)
            $hostInfo.find('div#business-name').html(jsonObj.hostUserVO.name)
            $hostInfo.find('div#business-hp').html(jsonObj.hostUserVO.tel)
            $hostInfo.find('div#business-email').html(jsonObj.hostUserVO.email)

            let $studycafeInfo = $('#studycafe-infomation-box');
            $studycafeInfo.find('div#studycafe-seq').html(jsonObj.srSeq)
            $studycafeInfo.find('div#studycafe-name').html(jsonObj.name)
            $studycafeInfo.find('div#studycafe-address').html(jsonObj.addr)
            $studycafeInfo.find('div#studycafe-open-time').html(jsonObj.openTime)
            $studycafeInfo.find('div#studycafe-end-time').html(jsonObj.endTime)
            if (jsonObj.oc == 0) {
                $studycafeInfo.find('div#studycafe-oc').html('영업중')
            } else if (jsonObj.oc == 1) {
                $studycafeInfo.find('div#studycafe-oc').html('영업종료')
            }

        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })

    //----회원정보수정 클릭 시START----
    $('#host-infomation-box > div:nth-child(9) > input[type=button]').click((e) => {
        location.href = frontURL + 'hostuser/editHost.html'
    })
    //----회원정보수정 클릭 시 END----

   //----카페정보수정 클릭 시START----
   $('#studycafe-infomation-box > div.textbox > div:nth-child(14) > input[type=button]').click((e) => {
    location.href = frontURL + 'studyroom/editStudycafe.html'
})
//----카페정보수정 클릭 시 END----

})

  //----룸 추가 클릭 시START----
$(document).on('click','#add-room-btn', (e)=>{
    let srSeq = $(e.target).parents('div.textbox').find('div#studycafe-seq').text();
    console.log(srSeq)
    location.href = frontURL + 'roominfo/addRoom.html?srSeq='+srSeq
})
//----룸 추가 클릭 시 END----