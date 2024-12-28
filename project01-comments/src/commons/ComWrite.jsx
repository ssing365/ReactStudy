import React from "react";

function ComWrite(props){
  const writeProcess = (e) => {
    e.preventDefault();
    let writer = e.target.writer.value;
    let comment = e.target.comment.value;

    // 폼값 검증
    if(writer === ''){
      alert("작성자를 입력하세요.");
      e.target.writer.focus();
      return;
    }
    if(comment === ''){
      alert("댓글 내용을 입력하세요.");
      e.target.comment.focus();
      return;
    }

    props.onWriteComment(writer,comment);

    e.target.writer.value = '';
    e.target.comment.value = '';
  }

  return (<>
    <form onSubmit={writeProcess}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer"/></td>
          <td rowSpan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment"></textarea></td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComWrite;  
