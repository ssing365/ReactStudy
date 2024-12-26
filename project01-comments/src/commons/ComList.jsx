import React, { useState } from "react";

function ComList(props) {
  const setEditWriter = props.setEditWriter;
  const setEditComment = props.setEditComment;

  const editMode = props.editMode;
  const setEditMode = props.setEditMode;

  const lists = props.myData.map((row) => {
    return (
      <>
        <tr key={row.no}>
          <td>{row.no}</td>
          <td>{row.writer}</td>
          <td>
            {row.date}
            <button type="button" onClick={(event)=>{
              event.preventDefault();
              if(editMode === 'offEditMode'){
                setEditMode("onEditMode")
              }else{
                alert("현재 수정모드입니다. 수정 취소를 먼저 눌러주세요")
                return
              }
              setEditWriter(row.writer);
              setEditComment(row.comment);

            }}>수정</button>
            <button type="button" onClick={(event)=>{
              event.preventDefault();
            }}>삭제</button>
          </td>
        </tr>
        <tr>
          <td colSpan="3" className="subject" 
            style={{ whiteSpace: "pre-line" }}>
          {row.comment}
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <table id="boardTable">
        {lists}
      </table>
    </>
  );
}

export default ComList;
