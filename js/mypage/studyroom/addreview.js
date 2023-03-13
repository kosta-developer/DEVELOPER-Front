$(()=>{
   userCheckLogined()
    $('span#showLoginId').html(sessionStorage.getItem("logined"));
  const postURL = decodeURI(location.href);
  const postURL2 = postURL.split("?");

  var postURL3 = postURL2[1].split("&");

  var srName = postURL3[0];
  var roomName = postURL3[1];
  var resSeq = postURL3[2];

  $(document).find(".cfName").html(srName);
  $(document).find(".rName").html(roomName);
  $(document).find(".SeqQuery").html(resSeq);
  //---룸 리뷰 작성 버튼 클릭 START --
  $(".btn").click(() => {
    var form1 = $("#myform").serialize();
    var starNum = form1.split("=");
    var star = starNum[1];
    var content = $("#myform-textarea").val();

    var params = {
      resSeq: resSeq,
      content: content,
      star: star,
    };
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backURL + "mypage/roomreview/add",
      method: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(params),

      success: function (data) {
        alert("후기 작성을 완료했습니다");
        location.href = frontURL + "mypage/roomreview.html";
      },
      error: function (xhr) {
        alert("로그인 하세요");
      },
    });
  });
  //---룸 리뷰 작성 버튼 클릭 END --
})