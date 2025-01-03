import "./App.css";
import { useState } from "react";

import Board from "./commons/Board";
import ComList from "./commons/ComList";
import ComWrite from "./commons/ComWrite";

// 현재 날짜
const nowDate = () => {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
};

function App() {
  // 댓글 출력용 state
  const [myData, setMyData] = useState([
    {
      no: 1,
      comment: "오늘은 React공부하는날",
      writer: "낙짜쌤",
      date: "2023-01-01",
    },
    {
      no: 2,
      comment: "어제는 Javascript공부해씸",
      writer: "유겸이",
      date: "2023-03-03",
    },
    {
      no: 3,
      comment: "내일은 Project해야징",
      writer: "개똥이",
      date: "2023-05-05",
    },
  ]);

    /**
   * addCommentProcess,
   * editCommentProcess,
   * deleteCommentProcess
   * 이 세 가지의 함수만 App컴포넌트에서 정의하고, props로 넘기니 깔끔하다.
   * (이렇게 하려면 코드 작성 전에 계획을 세워야할거같다)
   * 컴포넌트 마다 기능을 구현하는 함수가 각각 있다면 복잡해지는 것 같다.
   */

  // 시퀀스용 state
  const [nextNo, setNextNo] = useState(4);

  // 댓글 추가 함수
  const addCommentProcess = (writer, comment) => {
    let addComment = {no: nextNo, comment:comment, writer:writer, date:nowDate};
    let newMyData = [...myData];
    newMyData.push(addComment);
    setMyData(newMyData);
    setNextNo(nextNo+1);
  }

  // 댓글 수정 함수
  const editCommentProcess = (no, writer, comment) => {
    let newMyData = [...myData];
    newMyData.forEach((row) => {
      if (row.no === no) {
        row.writer = writer;
        row.comment = comment;
      }
    });
    setMyData(newMyData);
  };

  // 댓글 삭제 함수
  const deleteCommentProcess = (no) => {
    let newMyData = myData.filter((current) => {
      return current.no !== no;
    });
    setMyData(newMyData);
  };

  /**
   * 수정 관련해서 props가 무지 많았는데 정말 깔끔해졌다.
   * ComEdit컴포넌트를 List하위로 옮겼다.
   */
  return (
    <>
      <Board />
      <ComList
        myData={myData}
        onEditComment = {editCommentProcess}
        onDeleteComment = {deleteCommentProcess}
      />
      <ComWrite
        onWriteComment={addCommentProcess}
      />
    </>
  );
}

export default App;
