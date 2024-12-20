import React from "react";

function ArticleView({selectRow}) {
  console.log("선택한 게시물 : ", selectRow);
  return (
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{selectRow.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{selectRow.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{selectRow.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
            {selectRow.contents}
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

export default ArticleView;