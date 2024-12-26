import React from "react";
import {useState} from 'react';

function ComEdit(props){
  const editWriter = props.editWriter;
  const setEditWriter = props.setEditWriter;
  const editComment = props.editComment;
  const setEditComment = props.setEditComment;

  return (<>
    <form onSubmit={(event)=>{
      event.preventDefault();
      console.log('evemt', event.target)
    }}>
      <table id="boardTable">
        <tr>
          <td id="writer">
            Writer : 
            <input 
              type="text" name="writer" value={editWriter}
              onChange={(event)=>{
                setEditWriter(event.target.value);
              }}
            />
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
