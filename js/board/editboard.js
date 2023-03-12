let url = backURL + 'board/edit';
let postSeq = document.location.href.split("?")[1];
console.log(postSeq);

$(()=>{
    // 페이지 로드되었을시 목록 출력 START
    $.ajax({
        url:url,
        method:'get',
        data: postSeq,
        success : function(jsonObj){
            console.log(jsonObj);
           let boardData = "";

                boardData += "<div class='list-container'>";
                boardData += "<form id='editForm' enctype='multipart/form-data'>"
                boardData += "<div class='title'><input type='text' name='title' id='editTitle' value='"+jsonObj.title+"'></div>";
                boardData += "<div class='content'><textarea name='content' id='summernote' value='' placeholder='내용을 입력해주세요.'>"+jsonObj.content+"</textarea></div>";
                boardData += "<div class='imgPath'> 이미지: "+jsonObj.imgPath+"</div>";
                boardData += "<input type='file' name='f' multiple='multiple' accept='image/jpeg, image/png, image/gif'><br/>";
                boardData += "<div class='editbutton'>";
                boardData += "<div class='cancelbtn'><a href='community.html'><input type='button' value='취소' id='cancelbtn'></a></div>";
                boardData += "<div class='editbtn>'><button id='modifybtn'>수정</button><br/></div>";
                boardData += "</div>";
                boardData += "<input type='hidden' name='postSeq' value='"+jsonObj.postSeq+"'>";
                boardData += "</form>";
                boardData += "</div>";

                $("#list").append(boardData);

        },
        error : function(xhr){
            alert(xhr.status);
        }
    })
    // 페이지 로드되었을시 목록 출력 END
    //#modifybtn
    $(document).on('click', '#modifybtn',function(){
        let form = $('#editForm')[0];
        console.log(form);
        let formData = new FormData(form);

        // let form = document.getEle mentById('editForm');
        // let formData = new FormData();
        // title = $('input[name=title]').val();
        // title = $('#editTitle').val();
        // content = $('input[name=content]').val();
        // imgpath = $('input[name=imgPath]').val();
        // postseq = $('input[name=postSeq]').val();
        // formData.append('title', title);
        // formData.append('content', content);
        // formData.append('imgPath', imgpath);
        // formData.append('postSeq', postseq);
        
        console.log("폼데이터는:");
        console.log( formData.get('title'));
        formData.forEach((value, key) => {
            console.log(key)
            console.log(value)
            console.log('----')
        })
        let postSeq = $('input[name=postSeq]').val();
            $.ajax({
                xhrFields: {
                    //크로스오리진 에러를 통과할수 있는 자격! 쿠키를 host가다른 url로 요청되어도 유지할 수 있게!
                    withCredentials: true
                 },
                url: backURL + 'board/edit/'+$('input[name=postSeq]').val(),
                method:'post',
                data : formData,
                contentType: false, //파일업로드용 설정       mimeType : "multipart/form-data",
                processData : false,
                success: function (result) {
                    alert('수정이 완료되었습니다 !')
                    location.href = frontURL + 'board/boardDetail.html?postSeq='+postSeq;
                },
                error: function (xhr) {
                    alert('오류' + xhr.status)
                }
          })
          return false;

        
 });
 // 써머노트 스크립트
 $(document).ready(function () {
    $('#summernote').summernote({
        height: 200, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
    });
 });
 
})


