$(()=>{
   userCheckLogined()
    let $memberList = $("#memberList-body");
    //원본
     let $origin = $memberList.first();
     
     function showList(jsonObj){
      $origin.show();
    
     //원본의 복제본들
     let $removeMemberList = $memberList.not($origin);
     
     //복제본 삭제
     $removeMemberList.remove();
  
     let $parent = $origin.parent();
      let b = 1;
      $(jsonObj).each((index, a) => {
        let userId = a.userId;
        let nickname = a.nickname;
        let tel = a.tel;
        let $copy = $origin.clone();
        $copy.find("#num").html(b);
        b += 1;
        $copy.find("#userid").html(userId);
        $copy.find(".idVal").html(userId);
        $copy.find("#nickname").html(nickname);
        $copy.find("#tel").html(tel);
        $parent.append($copy);
      });
      $origin.hide();
  }
  //--회원리스트 출력 START--
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: backURL+"admin/users",
    method: "GET",
    success: function (jsonObj) {
      
     showList(jsonObj)
    },
    error: function (xhr) {
      alert(xhr.responseText);
    },
  });
  //--회원리스트 출력 END--

  //--회원 검색  START--
   $("#search-btn").click(() => {
    findStr();

   });
   
   function findStr() {
       var n = 0;
       var str = document.getElementById("textbox").value;
       if (navigator.userAgent.indexOf("rv:11") > -1) {
           var f,
           contents = document.body.createTextRange();
           for (var i = 0; i <= n && (f = contents.findText(str)) != false; i++) {
               contents.moveStart("character");
               contents.moveEnd("textedit");
            }
            if (f) {
                contents.moveStart("character", -1);
                contents.findText(str);
                contents.select();
                n++;
            }
        } else {
            window.find(str);
        }
    }
    //--회원 검색  END--
    //--상세보기 버튼 START--
    $(document).on("click", "#btn", (e) => {
        let idval = $(e.target).children("div.idVal").text();
        location.href = frontURL + "admin/memberdetail.html?" + idval;
    });
    
})