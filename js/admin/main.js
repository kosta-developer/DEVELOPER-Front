$(()=>{
  //--최신 스터디룸 리스트 5개 출력 START--
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: backURL + "admin/",
    method: "GET",
    success: function (jsonObj) {
      let $origin = $("div.studycafe-list").first();
      let $parent = $origin.parent();
      $(jsonObj.studyroomList5DTO).each((index, a) => {
        let seq = a.srSeq;
        let cafename = a.name;
        let host = a.hostIdDTO.hostId;
        let $copy = $origin.clone();
        $copy.find("#seq").html(seq);
        $copy.find("#study").html(cafename);
        $copy.find("#host").html(host);
        $parent.append($copy);
      });
      $origin.hide();
    },
    error: function (xhr) {
      alert(xhr.responseText);
    },
  });
  //--최신 스터디룸 리스트 5개 출력 END--
  //--최신 수업 리스트 5개 출력 START--
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: backURL + "admin/",
    method: "GET",
    success: function (jsonObj) {
      let $origin = $("div.currentClass").first();
      let $parent = $origin.parent();
      $(jsonObj.lessonList5DTO).each((index, a) => {
        let lessonName = a.lessonName;
        let category = a.category;
        let personnal = a.people;
        let $copy = $origin.clone();
        $copy.find("#lessonName").html(lessonName);
        // 0:프로그래밍언어, 1:웹개발, 2:앱개발, 3:보안/네트워크, 4:데이터, 5:게임개발
        if (category == 0) {
          $copy.find("#category").html("프로그래밍언어");
        } else if (category == 1) {
          $copy.find("#category").html("웹개발");
        } else if (category == 2) {
          $copy.find("#category").html("앱개발");
        } else if (category == 3) {
          $copy.find("#category").html("보안/네트워크");
        } else if (category == 4) {
          $copy.find("#category").html("데이터");
        } else {
          $copy.find("#category").html("게임개발");
        }

        $copy.find("#personnal").html(personnal + "명");
        $parent.append($copy);
      });
      $origin.hide();
    },
    error: function (xhr) {
      alert(xhr.responseText);
    },
  });
  //--최신 수업 리스트 5개 출력 END--
})