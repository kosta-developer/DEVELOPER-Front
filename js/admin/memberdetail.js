$(()=>{
  //--회원정보 상세출력 START--
  let userId = location.search.substring(1);
  let url = backURL + "admin/users/detail/" + userId;
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "GET",

    success: function (result) {
      let id = result.userId;
      let role = result.role;
      let nickname = result.nickname;
      let name = result.name;
      let tel = result.tel;
      let email = result.email;
      let addr = result.addr;
      if (role == 1) {
        $("#role").html("튜터");
      } else if (role == 2) {
        $("#role").html("튜티");
      } else if (role == 3) {
        $("#role").html("탈퇴");
      } else {
        $("#role").html("관리자");
      }
      $("#memIdContent").html(id);
      $("#nicknameValue").html(nickname);
      $("nameValue").html(name);
      $("tel").html(tel);
      $("emailValue").html(email);
      $("addrValue").html(addr);
    },
    error: function (xhr) {
      alert(xhr.responseText);
    },
  });
  //--회원정보 상세출력 END--
})
