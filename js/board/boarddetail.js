let Seq = document.location.href.split("?")[1];


let url2 = new URL(location.href);
let postSeq2 = url2.searchParams.get("postSeq");
let postSeq3 = Number(postSeq2);

$(() => {
    let url = backURL + 'board/detail';
    // 페이지 로드되었을시 목록 출력 START
    $.ajax({
        url: url,
        method: 'get',
        data: Seq,
        success: function (jsonObj) {
            // console.log(jsonObj);
            // console.log(jsonObj[0].cDate);
            let boardData = "";
            let boardRepData = "";
            let temp = "";

            $.each(jsonObj, function (index, item) {
                console.log(jsonObj);
                if (item.category == 0) {
                    temp = "Q/A";
                } else if (item.category == 1) {
                    temp = "스터디모집";
                } else if (item.category == 2) {
                    temp = "자유게시판"
                }
                
                if (index == 0) {
                    boardData += "<div class='boarddetaillist-container'>";
                    boardData += "<div class='title'>" + item.title + "</div>";
                    boardData += "<div class='content'>" + item.content + "</div>";
                    boardData += "<div class='imgPath'><img /></div>";
                    boardData += "<div class='info'>";
                    boardData += "<div class='subinfo1'>";
                    boardData += "<span> 작성자 : " + item.usersNameDTO.nickname + "</span>";
                    boardData += "<span> 작성일 : " + item.cdate + "</span>";
                    boardData += "</div>";
                    boardData += "<div class='subinfo2'>";
                    boardData += "<span><i class='fa-regular fa-eye'></i> " + item.cnt + "</span>";
                    boardData += "<span><i class='fa-solid fa-heart'></i> " + item.recommend + "</span> ";
                    boardData += "<input type='hidden' name='postSeq' value='" + item.postSeq + "'>";
                    boardData += "</div>";
                    boardData += "</div>";
                    boardData += "</div>";
                    $("#boarddetaillist").append(boardData);
                }

                boardRepData += "<div class='replist-container'>";
                if(item.boardRepSelectDTO.postRepSeq != null){
                boardRepData += "<span> 작성자 : " + item.boardRepSelectDTO.usersNameDTO.nickname + "</span>";
                boardRepData += "<div class='repcontent'>" + item.boardRepSelectDTO.content + "</div>";
                boardRepData += "<span> 작성일 :" + item.boardRepSelectDTO.cdate + "</span>";
                boardRepData += "<input type='hidden' name='postReqSeq' value='"+item.boardRepSelectDTO.postRepSeq +" '"
                boardRepData += "<div class='repdetailbtn'> <button type='button' id='repeditbtn'>수정</button>";
                boardRepData += "<button type='button' id='repdelbtn'>삭제</button>"
                boardRepData += "<form id='editReplyForm' style='display:none'><input type='text' name='editRepContent' id='editRepContent'>"
                boardRepData += "<button id='modifybtn'>수정완료</button><button id='cancelbtn'>취소</button></form></div></div>";
                $('#replist').append(boardRepData);
                }else{
                $('#replist').append("댓글이 존재하지 않습니다.");
                }
               
                let $img = $('div.boarddetaillist-container> div.imgPath');
                //--썸네일 이미지 다운로드 START--
                $.ajax({
                    xhrFields: {
                        responseType: "blob",
                    },
                    cache: false,
                    url: backURL + "download/board",
                    method: "get",
                    data: "imgPath=" + item.imgPath + "&opt=inline&type=1",
                    success: function (result) {
                        console.log(result);
                        let blobStr = URL.createObjectURL(result);
                        $img.find("img").attr("src", blobStr);
                    },
                });
            });
           
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })

    // ...버튼클릭시 수정,삭제버튼 보여지게
    $("#edit-btn").click(() => {
        $("#detailbtn").show();
    })

    // ...버튼클릭시 수정,삭제버튼 보여지게 

    //수정버튼 클릭시 START
    $('#editbtn').click(() => {
        location.href = frontURL + "board/editboard.html?" + Seq;
    })

    // 수정버튼 클릭시 END 
    
    //삭제버튼 클릭시 START
    $('#delbtn').click(() => {
        $.ajax({
            url: backURL + 'board/' + $('input[name=postSeq]').val(),
            method: 'delete',
            success: function () {
                location.href = frontURL + 'board/boardlist.html';
                alert('삭제가 완료되었습니다.')
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        })
    })
    // 삭제버튼 클릭시 END 

    //댓글 작성 START
    $('#addRepbtn').click (function () {
        let postSeq = $('input[name=postSeq]').val();
        let content = $('input[name=content]').val();
        if(content == ""){
            alert('내용을 입력해주세요');
            return false;
        }
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            method: 'post',
            url: backURL + 'boardRep/add/' + postSeq,
            contentType: "application/json",
            data: JSON.stringify({"content" : content,
            //  "postSeq": postSeq 
            }),
            success: function (response) {
                alert('댓글이 작성되었습니다!');
                window.location.href="boarddetail.html?postSeq="+postSeq;
            },
            error: function (xhr) {
                alert('오류' + xhr.status)
            }
        })
        return false;

    })
    //댓글 작성 END
  
    // 댓글 수정 START

    //수정버튼 클릭시 
    $(document).on("click", "#repeditbtn", function (){
        $('#editReplyForm').attr("style","display:block;");
    })
    //댓글수정버튼 클릭시 

     //취소버튼 클릭시
     $(document).on("click", "#cancelbtn", function (){
        $('#editReplyForm').attr("style","display:none;");
        return false;
    })
    //취소버튼 클릭시

    //댓글삭제버튼 클릭시
    $(document).on("click", "#repdelbtn", function(){
        let postSeq = $('input[name=postSeq]').val();
        let postRepSeq = $('input[name=postReqSeq]').val();
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'boardRep/' + postRepSeq,
            method: 'delete',
            success: function (response) {
                alert('댓글이 삭제되었습니다!');
                window.location.href="boarddetail.html?postSeq="+postSeq;
            },
            error: function (xhr) {
                alert('오류' + xhr.status)
            }
        })
        return false;
    })
    //댓글삭제버튼 클릭시

    //수정완료버튼 클릭시
    $(document).on("click", "#modifybtn", function(){
      
        let postSeq = $('input[name=postSeq]').val();
        let postRepSeq = $('input[name=postReqSeq]').val();
        let content = $('input[name=editRepContent]').val();
        if(content == ""){
            alert('내용을 입력해주세요');
            return false;
        }
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL + 'boardRep/' + postRepSeq,
            method: 'put',
            contentType: "application/json",
            data: JSON.stringify({"content" : content}),
            success: function (response) {
                alert('댓글이 수정되었습니다!');
                window.location.href="boarddetail.html?postSeq="+postSeq;
            },
            error: function (xhr) {
                alert('오류' + xhr.status)
            }
        })
        return false;
    })
    //수정완료버튼 클릭시

   
console.log(document.cookie);
   
    // 댓글 수정 END
})


