// let url = new URL(location.href);
// let seq = url.searchParams.get("lessonSeq");
// let lessonSeq = Number(seq);

$(()=>{
    checkIntervalLogined();

    let $origin_studyroom_info= $('div#studyroom_info').first()
    let $parent_admin_studyroom = $('div#admin_studyroom');
    $origin_studyroom_info.show()
    
    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url:backURL+'admin/studyroom',
        headers : { "Content-Type" : "application/json"},
        method:'get',
        success:(res) =>{
           
            console.log(res);
                $(res).each((index)=>{
                let $copy_studyroom_info = $origin_studyroom_info.clone();
                console.log(res[index].name);
                let srSeq = res[index].srSeq;
                  $copy_studyroom_info.find('div.host_id').html('<a href=./detail.html?srSeq='+srSeq+'>'+res[index].hostUser.hostId)
                  $copy_studyroom_info.find('div.name').html(res[index].name)
                  $copy_studyroom_info.find('div.open_time').html(res[index].openTime)
                  $copy_studyroom_info.find('div.end_time').html(res[index].endTime)
                  $copy_studyroom_info.find('div.srSeq').html(res[index].srSeq)
                  $parent_admin_studyroom.append($copy_studyroom_info)
                })
                $origin_studyroom_info.hide();

        },
        error : function(xhr){
            alert(xhr.status);
        }
    })

})
