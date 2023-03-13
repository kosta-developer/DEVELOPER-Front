$(() => {
    userCheckIntervalLogined();

    //-----정보출력 START------
    let url = backURL+"orders/orderlist"
    // let url = backURL + 'admin/host';
    let $origin = $('div.list-of-order-origin').first()
    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.list-of-order');
            // let $hostId = $(jsonObj.hostId)
            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()

                $copy.find('span.lessonName').html(item.lessonDTO.lessonName) 
                $copy.find('span.price').html('10,000') 
                $copy.find('span.orderDate').html(item.odate)
        
                $parent.append($copy)

            })
            $origin.hide()
        }
    })
})