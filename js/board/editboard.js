let url = backURL + 'board/edit';
let postSeq = document.location.href.split("?")[1];
console.log(postSeq);

$(()=>{
    userCheckIntervalLogined();

 // 써머노트 스크립트
 $(document).ready(function () {
    $('#summernote').summernote({
        height: 200, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
    });
 });
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
                boardData += "<div class='imgPath'> <img /></div>";
                boardData += "<div class='show'></div>"
                boardData += "<input type='file' name='f' multiple='multiple' accept='image/jpeg, image/png, image/gif'><br/>";
                boardData += "<div class='editbutton'>";
                boardData += "<div class='cancelbtn'><a href='/html/board/boarddetail.html?postSeq='"+jsonObj.postSeq+"><input type='button' value='취소' id='cancelbtn'></a></div>";
                boardData += "<div class='editbtn>'><button id='modifybtn'>수정</button><br/></div>";
                boardData += "</div>";
                boardData += "<input type='hidden' name='postSeq' value='"+jsonObj.postSeq+"'>";
                //boardData += "<input type='hidde"
                boardData += "</form>";
                boardData += "</div>";

                $("#list").append(boardData);

                let $img = $('div.list>div.list-container>form div.imgPath');
                //--썸네일 이미지 다운로드 START--
                $.ajax({
                    xhrFields: {
                        responseType: "blob",
                    },
                    cache: false,
                    url: backURL + "download/board",
                    method: "get",
                    data: "imgPath=" + jsonObj.imgPath+ "&opt=inline&type=1",
                    success: function (result) {
                        console.log(result);
                        let blobStr = URL.createObjectURL(result);
                        $img.find("img").attr("src", blobStr);
                    },
                });
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
  //—첨부파일이 변경되었을때 할일 START—
  let $divShow = $('div.show')
  $('div.form>form>input[type=file]').change((e) => {
      $(e.target.files).each((index, imgFileObj) => {
          // let imgFileObj = e.target.files[0]

          console.log(imgFileObj)
          //blob타입의 이미지파일객체내용을 문자열로 변환
          let blobStr = URL.createObjectURL(imgFileObj)
          // $('div.show>img').attr('src', blobStr)
          let img = $('<img>')
              .attr('src', blobStr)
              .css('margin-left', '10px')
          $divShow.append(img)
      })
  })
 
})


