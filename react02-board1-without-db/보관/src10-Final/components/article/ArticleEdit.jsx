import React, { useState } from "react";

/**
 * 수정페이지를 구성하기 위해 기존의 데이터를 props로 전달받아 input 태그의 속성값으로 설정했다.
 * 하지만 props는 외부에서 내부로 전달되는 일종의 파라미터이므로 
 * 읽기전용으로 설정되어있어 수정이 불가하다는 문제가 있다.
 * 
 * 위와 같은 문제로 props를 state에 저장한 후 
 * onChange 이벤트 핸들러를 통해 설정된 내용을 수정할 수 있도록 변경한다.
 */

function ArticleEdit(props) {
  /**
   * input 개수만큼 state 생성
   * props로 전달된 데이터를 각각 useState()정의
   * 이렇게 하면 props는 기존 값을 유지하고 복사본은 수정할 수 있게 된다.
   */
  const [title, setTitle] = useState(props.selectRow.title);
  const [writer, setWriter] = useState(props.selectRow.writer);
  const [contents, setContents] = useState(props.selectRow.contents);

  return (
    <article>
      {/** submit 이벤트 처리는 쓰기와 완전히 동일하다. */}
      <form onSubmit={(event)=>{
        event.preventDefault();
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
              {/** value 속성값은 state로 정의한 값 설정
              해당 <input>에서 발생되는 이벤트를 통해 입력값을 변경한다. */}
              <td>
                <input type="text" name="writer" value={writer}
                    onChange={(event)=>{
                      setWriter(event.target.value);
                    }} />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" value={title}
                    onChange={(event)=>{
                      setTitle(event.target.value);
                    }} />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea name="contents" id="" cols="22" rows="3" 
                  value={contents}
                  onChange={(event)=>{
                    setContents(event.target.value);
                  }}></textarea>
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