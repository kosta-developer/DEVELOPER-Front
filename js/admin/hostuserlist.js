$(() => {
    userCheckIntervalLogined();

    //-----정보출력 START------
    let url = backURL + 'admin/host';
    let $origin = $('div.list-of-host-origin').first()
    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.list-of-host');
            // let $hostId = $(jsonObj.hostId)
            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()
                $copy.find('span.host-hostId').html(item.hostId) 
                $copy.find('span.host-tel').html(item.tel) 
                $copy.find('span.host-email').html(item.email)
                $copy.find('span.host-num').html(item.num) 
        
                $parent.append($copy)

            })
            $origin.hide()
            
            $(document).on('click','span.host-hostId', (e)=>{
                let hostId = $(e.target).html()
                console.log('클릭한 hostId' +hostId)
                location.href = frontURL + 'admin/hostuserdetail.html?hostId='+hostId
            })

        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
    //-----정보출력 END------
    
    //--hostId 클릭시 START --
    // $(document).on('click','span.host-hostId', (e)=>{
    //     let hostId = $(e.target).parents('div.list-of-host').find('span#hostId').text();

    //     console.log('호스트아이디는'+hostId)
    // })
        // location.href = frontURL + 'admin/host/detail/'+hostId
    //--hostId 클릭시 END --



})





