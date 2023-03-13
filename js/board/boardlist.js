let url = backURL + 'board/list';

$(()=>{
  userCheckIntervalLogined();

//     // 페이지 로드되었을시 목록 출력 START
//     function showBoardList(url){
//       let query = new URL(location.href);
//       let orderby= query.searchParams.get("orderby");
//       let currentPage= query.searchParams.get("currentpage");

// if(orderby == null){
//     orderby ="c_date"
// }
// if(currentPage == null){
//   currentPage = parseInt(1)
// }
//       $.ajax({
//         xhrFields: {
//           withCredentials: true //크로스오리진을 허용!
//         },
//           url: url,
//           method: "get",
//           data: {
//                   // currentPage:currentPage,
//                   orderby:orderby,
//                   currentPage:currentPage},
//           success: (res) => {
//               let totalCnt = res.totalCnt
//               let totalPage = res.totalPage
//               let startPage = res.startPage
//               let endPage = res.endPage
//               let list = res.list 
//               $("#list").empty();
//           list.forEach((item) => {
//               console.log(item);
//               let category = item.category === 0 ? "Q/A" : item.category === 1 ? "스터디모집" : "자유게시판";
//               let title = item.title;
//               let content = item.content;
//               let nickname = item.usersDTO.nickname;
//               let cDate = item.cDate;
//               let recommend = item.recommend;
//               let cnt = item.cnt;
//               let totalPages = item.totalPages
//               // postSeq=${item.postSeq}
//               let boardData = `
//                 <div class='list-container'>
//                   <div class='title'><a href='boarddetail.html?postSeq=${item.postSeq}'>${title}</a></div>
//                   <div class='content'>${content}</div>
//                   <div class='info'>
//                     <div class='subinfo1'>
//                       <span> 작성자 : ${nickname}</span>
//                       <span> 작성일 : ${cDate}</span>
//                       <span class='postCategory'> 카테고리 : ${category}</span>
//                     </div>
//                     <div class='subinfo2'>
//                       <span><i class='fa-solid fa-heart'></i> ${recommend}</span>
//                       <span><i class='fa-regular fa-eye'></i> ${cnt}</span>
//                     </div>
//                   </div>
//                 </div>
//               `;
      
//               $("#list").append(boardData);
          
//               let $pageGroup = $('div.pagegroup')
//               //페이지그룹 
//                let pageGroupStr = '';
//                if(startPage > 1){
//                   pageGroupStr += '<span class="'+(startPage-1)+'">[PREV]</span>'
//               }
//               if(endPage > totalPage){
//                   endPage = totalPage;
//               }
//                 //페이지 넘버링 
//                 for(let i=startPage; i<=endPage; i++){
//                   if(i == currentPage){
//                       //현재페이지 구분 css먹이려고 current + i
//                       pageGroupStr += '<span class="current '+i+'">[' + i +']</span>'
//                   }else{
//                       pageGroupStr += '<span class="'+i+'">[' + i +']</span>'
//                   }
//               }
//               //endpage의 다음페이지 가있을 때 
//               if(endPage < totalPage){
//                   pageGroupStr += '<span class="'+(endPage+1)+'">[NEXT]</span>'
//               }
//               $pageGroup.html(pageGroupStr);
      
//                   // 생성된 페이지 그룹을 페이지에 추가
//                   $('div.pagegroup').html(pageGroupStr);
//             });
      
//           },
//           error : function(xhr){
//               alert(xhr.status);
//           }
//         });

function showBoardList(url, currentPage){
$.ajax({
  xhrFields: {
    withCredentials: true //크로스오리진을 허용!
  },
    url: url,
    method: "get",
    data: {currentPage:currentPage},
    success: (res) => {
        let totalCnt = res.totalCnt
        let totalPage = res.totalPage
        let startPage = res.startPage
        let endPage = res.endPage
        let list = res.list 
        $("#list").empty();
    list.forEach((item) => {
        console.log(item);
        let category = item.category === 0 ? "Q/A" : item.category === 1 ? "스터디모집" : "자유게시판";
        let title = item.title;
        let content = item.content;
        let nickname = item.usersDTO.nickname;
        let cDate = item.cDate;
        let recommend = item.recommend;
        let cnt = item.cnt;
        let totalPages = item.totalPages
        // postSeq=${item.postSeq}
        let boardData = `
          <div class='list-container'>
            <div class='title'><a href='boarddetail.html?postSeq=${item.postSeq}'>${title}</a></div>
            <div class='content'>${content}</div>
            <div class='info'>
              <div class='subinfo1'>
                <span> 작성자 : ${nickname}</span>
                <span> 작성일 : ${cDate}</span>
                <span class='postCategory'> 카테고리 : ${category}</span>
              </div>
              <div class='subinfo2'>
                <span><i class='fa-solid fa-heart'></i> ${recommend}</span>
                <span><i class='fa-regular fa-eye'></i> ${cnt}</span>
              </div>
            </div>
          </div>
        `;

        $("#list").append(boardData);
    
        let $pageGroup = $('div.pagegroup')
        //페이지그룹 
         let pageGroupStr = '';
         if(startPage > 1){
            pageGroupStr += '<span class="'+(startPage-1)+'">[PREV]</span>'
        }
        if(endPage > totalPage){
            endPage = totalPage;
        }
          //페이지 넘버링 
          for(let i=startPage; i<=endPage; i++){
            if(i == currentPage){
                //현재페이지 구분 css먹이려고 current + i
                pageGroupStr += '<span class="current '+i+'">[' + i +']</span>'
            }else{
                pageGroupStr += '<span class="'+i+'">[' + i +']</span>'
            }
        }
        //endpage의 다음페이지 가있을 때 
        if(endPage < totalPage){
            pageGroupStr += '<span class="'+(endPage+1)+'">[NEXT]</span>'
        }
        $pageGroup.html(pageGroupStr);

            // 생성된 페이지 그룹을 페이지에 추가
            $('div.pagegroup').html(pageGroupStr);
      });

    },
    error : function(xhr){
        alert(xhr.status);
    }
  });

// 페이지 로드되었을시 목록 출력 END

// 제목으로 검색 했을 때 START
$('#searchbtn').click(()=>{
    let titleValue = $('input[name=title]').val()
    $.ajax({
      xhrFields: {
        withCredentials: true //크로스오리진을 허용!
     },
        url:backURL + "board/search",
        method: "get",
        data: {"title":titleValue,
        currentPage:currentPage},
        success: (res) => {
            let totalCnt = res.totalCnt
            let currentPage = res.currentPage;
            let totalPage = res.totalPage
            let startPage = res.startPage
            let endPage = res.endPage
            let list = res.list 
            $("#list").empty();
        list.forEach((item) => {
            console.log(item);
            let category = item.category === 0 ? "Q/A" : item.category === 1 ? "스터디모집" : "자유게시판";
            let title = item.title;
            let content = item.content;
            let nickname = item.usersDTO.nickname;
            let cDate = item.cDate;
            let recommend = item.recommend;
            let cnt = item.cnt;
            let totalPages = item.totalPages
            let boardData = `
              <div class='list-container'>
                <div class='title'><a href='boarddetail.html?postSeq=${item.postSeq}'>${title}</a></div>
                <div class='content'>${content}</div>
                <div class='info'>
                  <div class='subinfo1'>
                    <span> 작성자 : ${nickname}</span>
                    <span> 작성일 : ${cDate}</span>
                    <span class='postCategory'> 카테고리 : ${category}</span>
                  </div>
                  <div class='subinfo2'>
                    <span><i class='fa-solid fa-heart'></i> ${recommend}</span>
                    <span><i class='fa-regular fa-eye'></i> ${cnt}</span>
                  </div>
                </div>
              </div>
            `;
            $("#list").append(boardData);
        
            let $pageGroup = $('div.pagegroup')
            //페이지그룹 
             let pageGroupStr = '';
             if(startPage > 1){
                pageGroupStr += '<span class="'+(startPage-1)+'">[PREV]</span>'
            }
            if(endPage > totalPage){
                endPage = totalPage;
            }
              //페이지 넘버링 
              for(let i=startPage; i<=endPage; i++){
                if(i == currentPage){
                    //현재페이지 구분 css먹이려고 current + i
                    pageGroupStr += '<span class="current '+i+'">[' + i +']</span>'
                }else{
                    pageGroupStr += '<span class="'+i+'">[' + i +']</span>'
                }
            }
            //endpage의 다음페이지 가있을 때 
            if(endPage < totalPage){
                pageGroupStr += '<span class="'+(endPage+1)+'">[NEXT]</span>'
            }
            $pageGroup.html(pageGroupStr);
    
            // 생성된 페이지 그룹을 페이지에 추가
            $('div.pagegroup').html(pageGroupStr);
          });
    
        },
        error : function(xhr){
            alert(xhr.status);
        }
        })
    })
}

// 조회순 버튼 클릭되었을시 START
$('#cntbtn').click(()=>{
    $.ajax({
      xhrFields: {
        withCredentials: true //크로스오리진을 허용!
      },
        url: backURL+'board/listcnt',
        method: "get",
        data: {currentPage:currentPage},
        success: (res) => {
          alert('조회수버튼');
            let totalCnt = res.totalCnt
            let totalPage = res.totalPage
            let startPage = res.startPage
            let endPage = res.endPage
            let list = res.list 
            $("#list").empty();
        list.forEach((item) => {
            console.log(item);
            let category = item.category === 0 ? "Q/A" : item.category === 1 ? "스터디모집" : "자유게시판";
            let title = item.title;
            let content = item.content;
            let nickname = item.usersDTO.nickname;
            let cDate = item.cDate;
            let recommend = item.recommend;
            let cnt = item.cnt;
            let totalPages = item.totalPages
            // postSeq=${item.postSeq}
            let boardData = `
              <div class='list-container'>
                <div class='title'><a href='boarddetail.html?postSeq=${item.postSeq}'>${title}</a></div>
                <div class='content'>${content}</div>
                <div class='info'>
                  <div class='subinfo1'>
                    <span> 작성자 : ${nickname}</span>
                    <span> 작성일 : ${cDate}</span>
                    <span class='postCategory'> 카테고리 : ${category}</span>
                  </div>
                  <div class='subinfo2'>
                    <span><i class='fa-solid fa-heart'></i> ${recommend}</span>
                    <span><i class='fa-regular fa-eye'></i> ${cnt}</span>
                  </div>
                </div>
              </div>
            `;
    
            $("#list").append(boardData);
        
            let $pageGroup = $('div.pagegroup')
            //페이지그룹 
             let pageGroupStr = '';
             if(startPage > 1){
                pageGroupStr += '<span class="'+(startPage-1)+'">[PREV]</span>'
            }
            if(endPage > totalPage){
                endPage = totalPage;
            }
              //페이지 넘버링 
              for(let i=startPage; i<=endPage; i++){
                if(i == currentPage){
                    //현재페이지 구분 css먹이려고 current + i
                    pageGroupStr += '<span class="current '+i+'">[' + i +']</span>'
                }else{
                    pageGroupStr += '<span class="'+i+'">[' + i +']</span>'
                }
            }
            //endpage의 다음페이지 가있을 때 
            if(endPage < totalPage){
                pageGroupStr += '<span class="'+(endPage+1)+'">[NEXT]</span>'
            }
            $pageGroup.html(pageGroupStr);
    
                // 생성된 페이지 그룹을 페이지에 추가
                $('div.pagegroup').html(pageGroupStr);
          });
    
        },
        error : function(xhr){
            alert(xhr.status);
        }
    })
})
// 조회순 버튼 클릭되었을시 END
//페이지 그룹 클릭되었을시 START

$('div.pagegroup').on('click', 'span:not(.current)', (e)=>{
    let page = $(e.target).attr('class')
    showBoardList(url, page)
})
//페이지 그룹 클릭되었을시 END

//1페이지부터 보여주기위함 
showBoardList(url, 1)
// showBoardList(url)


// 최신순 버튼 클릭되었을시 START
// $('#descbtn').click(()=>{
//     alert('desc');

// function showBoardList(url, currentPage){
//     $.ajax({
//       xhrFields: {
//         withCredentials: true //크로스오리진을 허용!
//      },
//         url: url,
//         method: "get",
//         data: {currentPage:currentPage},
//         success: (res) => {
//             let totalCnt = res.totalCnt
//             let totalPage = res.totalPage
//             let startPage = res.startPage
//             let endPage = res.endPage
//             let list = res.list 
    
//         list.forEach((item) => {
//             console.log(item);
//             let category = item.category === 0 ? "Q/A" : item.category === 1 ? "스터디모집" : "자유게시판";
//             let title = item.title;
//             let content = item.content;
//             let nickname = item.usersDTO.nickname;
//             let cDate = item.cDate;
//             let recommend = item.recommend;
//             let cnt = item.cnt;
//             let totalPages = item.totalPages
//             let boardData = `
//               <div class='list-container'>
//                 <div class='title'><a href='boarddetail.html?postSeq=${item.postSeq}'>${title}</a></div>
//                 <div class='content'>${content}</div>
//                 <div class='info'>
//                   <div class='subinfo1'>
//                     <span> 작성자 : ${nickname}</span>
//                     <span> 작성일 : ${cDate}</span>
//                     <span class='postCategory'> 카테고리 : ${category}</span>
//                   </div>
//                   <div class='subinfo2'>
//                     <span><i class='fa-solid fa-heart'></i> ${recommend}</span>
//                     <span><i class='fa-regular fa-eye'></i> ${cnt}</span>
//                   </div>
//                 </div>
//               </div>
//             `;
    
//             $("#list").append(boardData);
        
//             let $pageGroup = $('div.pagegroup')
//             //페이지그룹 
//              let pageGroupStr = '';
//              if(startPage > 1){
//                 pageGroupStr += '<span class="'+(startPage-1)+'">[PREV]</span>'
//             }
//               //페이지 넘버링 
//               for(let i=startPage; i<=endPage; i++){
//                 if(i == currentPage){
//                     //현재페이지 구분 css먹이려고 current + i
//                     pageGroupStr += '<span class="current '+i+'">[' + i +']</span>'
//                 }else{
//                     pageGroupStr += '<span class="'+i+'">[' + i +']</span>'
//                 }
//             }
//             //endpage의 다음페이지 가있을 때 
//             if(endPage < totalPage){
//                 pageGroupStr += '<span class="'+(endPage+1)+'">[NEXT]</span>'
//             }
//             $pageGroup.html(pageGroupStr);
    
//                 // 생성된 페이지 그룹을 페이지에 추가
//                 $('div.pagegroup').html(pageGroupStr);
//           });
    
//         },
//         error: function(xhr){
//             let jsonObj = JSON.parse(xhr.responseText);
//           alert(jsonObj.msg);
//         }
//       });
//     }
//   })

// 최신순 버튼 클릭되었을시 END

// 글쓰기 버튼 클릭되었을시 START
$('#addbtn').on("click",function(){
    location.href= frontURL + "board/addboard.html";
});
// 글쓰기 버튼 클릭되었을시 END

})