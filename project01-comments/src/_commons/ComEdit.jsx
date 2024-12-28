import React from "react";
import {useState} from 'react';

function ComEdit(props){
  const editWriter = props.editWriter;
  const setEditWriter = props.setEditWriter;
  const editComment = props.editComment;
  const setEditComment = props.setEditComment;
  const setEditMode = props.setEditMode;

  return (<>
    <form onSubmit={(event)=>{
      event.preventDefault();
      console.log(event.target)
      let no = event.target.num.value;
      let writer = event.target.writer.value
      let comment = event.target.comment.value
      console.log(no)
      
      props.editCommentProcess(no, writer, comment);

      event.target.writer.value = '';
      event.target.comment.value = '';
    }}>
      <table id="boardTable">
        <tr>
          <td id="writer">
            <input type="number" name="num" id="num" hidden value={(props.nextNo)-1} />
            Writer : 
            <input 
              type="text" name="writer" value={editWriter}
              onChange={(event)=>{
                setEditWriter(event.target.value);
              }}
            />
            <button onClick={()=>{
              setEditWriter('')
              setEditComment('')
              setEditMode('offEditMode')
            }}>수정취소</button>
          </td>
          <td rowSpan="2">
            <input type="submit" value="댓글수정" id="btn"/>
          </td>
        </tr>
        <tr>
          <td>
            <textarea name="comment" value={editComment}
              onChange={(event)=>{
                setEditComment(event.target.value);
              }} />
          </td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComEdit;  
