import React from "react";

function ArticleWrite(props) {
  return (
    <article>
      <form onSubmit={(event)=>{
        event.preventDefault();

        /**
        * event 객체의 target 속성으로 <input>의 DOM에 접근한 후 입력값을 얻어온다.
        */
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        props.writeAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" name="writer" />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea name="contents" id="" cols="22" rows="3"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  );
}

export default ArticleWrite;