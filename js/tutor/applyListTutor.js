$(() => {
    let url = backURL +'tutor/applylist'
    let $origin = $('div.apply-list-tutor-origin').first()

    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.apply-list-tutor');

            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()
                $copy.find('span#reservation-seq').html(item.resSeq) //우선 display:hidden
          
            
   
              

                $parent.append($copy)
            })
            $origin.hide()
            
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
    
    
})


//$(e.target).parents('div.room-list-origin').find('div#room-seq').text();

//--승인 클릭시 START--
//--승인 클릭시 END--

//--승인거절 클릭시 START--
//--승인거절 클릭시 END--