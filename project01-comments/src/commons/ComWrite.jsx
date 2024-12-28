import React from "react";

function ComWrite(props){
  const writeProcess = (e) => {
    e.preventDefault();
    let writer = e.target.writer.value;
    let comment = e.target.comment.value;

    props.onWriteComment(writer,comment);

    e.target.writer.value = '';
    e.target.comment.value = '';
  }

  return (<>
    <form onSubmit={{
      writeProcess
    }}>
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
