let roomSeq = document.location.href.split("?")[1];
$(() => {
    let url = backURL + 'reservation/listreservation'
    let $origin = $('div.reservation-list-origin').first()

    $origin.show()
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        data: 'hostId=suho522',
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent = $('div.reservation-list');

            $(jsonObj).each((index, item) => {
                let $copy = $origin.clone()
                $copy.find('span#reservation-seq').html(item.resSeq) //우선 display:hidden
                $copy.find('span#reservation-usingDate').html(item.usingDate) //우선 display:hidden

                if(!item.userId){
                    
                    $copy.find('span#reservation-idAndName').html('-')
                } else if(item.userId){
                    $copy.find('span#reservation-idAndName').html(item.userId +'('+ item.uName +')')
                } 
                
                if(!item.hostId){
                    $copy.find('span#reservation-hostId').html('-')
                } else if(item.hostId){
                    $copy.find('span#reservation-hostId').html(item.hostId)
                    $('span#reservation-hostId').css('background-color', '#bbbbbb')
                    
                   } 

                $copy.find('span#reservation-roomName').html(item.rifName)
                $copy.find('span#reservation-startTime').html(item.startTime)
                $copy.find('span#reservation-endTime').html(item.endTime)
            
   
              

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

//----예약번호 클릭 시 START----
$(document).on('click','span#reservation-seq', (e)=>{
    // let roomSeq = $('div.room-list-origin>div#room-seq').text()
    let resSeq = $(e.target).parents('div.reservation-list-origin').find('span#reservation-seq').text();
    console.log(resSeq)
    location.href = frontURL + 'reservation/infoReservation.html?resSeq='+resSeq

})
//----예약번호 클릭 시 END----