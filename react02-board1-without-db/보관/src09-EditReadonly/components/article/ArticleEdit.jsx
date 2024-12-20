import React from "react";

/**
 * 수정페이지를 구성하기 위해 기존 데이터를 Props로 전달받아 input의 value 속성값으로 설정한다.
 * 하지만 이 경우 <input>이 readonly속성으로 렌더링되어 기존의 내용을 수정할 수 없게 된다.
 * React에서 props는 외부에서 내부로 전달되는 일종의 파라미터이므로 
 * 애초에 '읽기전용'으로 설정돼 있기 때문이다.
 */

function ArticleEdit(props) {
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

        //console.log("ArticleEdit컴포", title, writer, contents);
        props.editAction(title, writer, contents);


        if(writer == ''){
          alert('작성자를 입력하세요')
          event.target.writer.focus()
          return false;
        }
        else if(title == ''){
          alert('제목을 입력하세요')
          event.target.title.focus()
          return false;
        }
        else if(contents == ''){
          alert('내용을 입력하세요')
          event.target.contents.focus()
          return false;
        }

      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" name="writer" value={props.selectRow.writer} />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" value={props.selectRow.title} />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              {/** HTML에서는 <textarea>에 value속성을 사용하지 않지만
               * JSX에서는 <input>과 동일하게 이 속성으로 값을 설정한다.
               */}
              <td>
                <textarea name="contents" id="" cols="22" rows="3" 
                  value={props.selectRow.contents}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기" />
      </form>
    </article>
  );
}

export default ArticleEdit;