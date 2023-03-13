let url2 = new URL(location.href);
let hostId = url2.searchParams.get("hostId");

$(()=>{
    userCheckIntervalLogined();
    $('span#showLoginId').html(sessionStorage.getItem("logined"));

    let $origin_hostDetail= $('div#hostDetail').first()
    let $parent_hostinfo = $('div.hostinfo');
    $origin_hostDetail.show()
    
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url:backURL+'admin/host/detail/'+hostId,
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(res) =>{
            
            if (res.ready == 0) {
                temp = "회원상태 : 승인대기";
            } else if (res.ready == 1) {
                temp = "회원상태 : 승인";
            } else if (res.ready == 2) {
                temp = "회원상태 : 탈퇴"
            }
                console.log(res);
                let $copy_hostDetail= $origin_hostDetail.clone();
                  $copy_hostDetail.find('div.host_id').html("아이디: "+res.hostId)
                  $copy_hostDetail.find('div.email').html("email: "+res.email)
                  $copy_hostDetail.find('div.name').html("이름: "+res.name)
                  $copy_hostDetail.find('div.num').html("사업자번호: "+res.num)
                  $copy_hostDetail.find('div.tel').html("전화번호: "+res.tel)
                  $copy_hostDetail.find('div.ready').html(temp)
                  $parent_hostinfo.append($copy_hostDetail)
                $origin_hostDetail.hide();

        },
        error : function(xhr){
            alert(xhr.status);
        }
    })

})
