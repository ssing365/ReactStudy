import React from "react";

// 게시판 목록
function ArticleList(props) {
  const lists = [];
  // for (let i = 0; i < props.boardData.length; i++) {
  //   let row = props.boardData[i];
  //   lists.push(
  //     <tr key={row.no}>
  //       <td className="cen">{row.no}</td>
  //       {/** 제목 클릭하면 열람으로 전환. 'read/번호'형식으로 링크 설정 */}
  //       <td>
  //         <a
  //           href={"/read/" + row.no}
  //           onClick={(event) => {
  //             event.preventDefault();
  //             //각 게시물의 일련번호를 전달
  //             props.onChangeMode(row.no);
  //           }}
  //         >
  //           {row.title}
  //         </a>
  //       </td>
  //       <td className="cen">{row.writer}</td>
  //       <td className="cen">{row.date}</td>
  //     </tr>
  //   );
  // }
  props.boardData.map((article) => {
    lists.push(
      <tr key={article.no}>
        <td className="cen">{article.no}</td>
        {/** 제목 클릭하면 열람으로 전환. 'read/번호'형식으로 링크 설정 */}
        <td>
          <a
            href={"/read/" + article.no}
            onClick={(event) => {
              event.preventDefault();
              //각 게시물의 일련번호를 전달
              props.onChangeMode(article.no);
            }}
          >
            {article.title}
          </a>
        </td>
        <td className="cen">{article.writer}</td>
        <td className="cen">{article.date}</td>
      </tr>
    );
  });

  return (
    <article>
      <table id="boardTable">
        <thead>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </thead>
        <tbody>
          {/** 배열에 추가한 데이터를 여기서 출력 */}
          {lists}
        </tbody>
      </table>
    </article>
  );
}

export default ArticleList;
