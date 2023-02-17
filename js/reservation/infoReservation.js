let url = backURL + 'reservation/inforeservation';
let data = location.search.substring(1);

$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        method: 'get',
        data: data,
        success: function (jsonObj) {
            console.log(jsonObj)
            let $reservationInfo = $('div.detail-content-box');

            $reservationInfo.find('div#reservation-seq').html(jsonObj.resSeq)

            if(!jsonObj.userId){
                $reservationInfo.find('div#reservation-name').html(jsonObj.hostId)
            }
                $reservationInfo.find('div#reservation-name').html(jsonObj.uName)
            

            $reservationInfo.find('div#reservation-hp').html(jsonObj.tel)
            $reservationInfo.find('div#reservation-roomName').html(jsonObj.rifName)
            $reservationInfo.find('div#reservation-usingDate').html(jsonObj.usingDate)
            $reservationInfo.find('div#reservation-startTime').html(jsonObj.startTime)
            $reservationInfo.find('div#reservation-endTime').html(jsonObj.endTime)
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
    
})
