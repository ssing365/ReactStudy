import React from "react";

const Board = (props) => {
  return (<>
    <h2>댓글 기능 구현</h2>
    <table id="boardTable">
        <colgroup>
          <col width="100"/><col width="150"/><col width="100"/><col width="150"/>
        </colgroup>
        <tr>
          <th>번호</th>
          <td>100</td>
          <th>작성자</th>
          <td>낙짜쌤</td>
        </tr>
        <tr>
          <th>제목</th>
          <td colSpan="3" className="subject">오늘은 리액트로 정했다.</td>
        </tr>
        <tr> 
          <th>내용</th>
          <td colSpan="3" className="subject">
            읽기 부분은 구현하지 않습니다. <br/>
            아래 댓글 부분을 구현하면 됩니다. 
          </td>            
        </tr>
        <tr>
          <td colSpan="4" align="center">
            <button type="button" onClick={()=>{}}>수정하기</button>
            <button type="button" onClick={()=>{}}>삭제하기</button>
            <button type="button" onClick={()=>{}}>리스트</button>
          </td>
        </tr>
    </table>    
  </>);
}

export default Board;  
