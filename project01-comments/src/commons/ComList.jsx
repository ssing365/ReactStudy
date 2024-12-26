import React, { useState } from "react";

function ComList(props) {
  const setEditWriter = props.setEditWriter;
  const setEditComment = props.setEditComment;

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
