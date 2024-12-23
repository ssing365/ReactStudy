import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import List from "./components/board/List";
import Write from "./components/board/Write";
import View from "./components/board/View";
import NotFound from "./components/common/NotFound";
import { useState } from "react";

const nowDate = () => {
  // 현재 날짜
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ("0" + (1+ dateObj.getMonth())).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {
  // 데이터로 사용할 객체형 배열 생성
  // 글쓰기를 위해 기존 배열을 state로 변경
  const [boardData, setBoardData] = useState([
    {
      no: 1,
      title: "오늘은 React공부하는 날",
      writer: "낙자쌤",
      date: "2023-01-01",
      contents: "React를 뽀개봅시다",
    },
    {
      no: 2,
      title: "어제는 JS공부해씸",
      writer: "유겸이",
      date: "2023-03-03",
      contents: "JavaScript는 할게 너무 많아요",
    },
    {
      no: 3,
      title: "내일 Project할건데",
      writer: "개똥이",
      date: "2023-05-05",
      contents: "Project는 뭘 할까?",
    },
  ]);

  // 시퀀스용 state 생성. 초기값 4로 설정(처음엔 글 세개가 있으니까)
  const [nextNo, setNextNo] = useState(4);

  // 작성 완료 후 페이지 이동을 위한 Hook
  const navigate = useNavigate();

  return (
      <Routes>
        {/* 데이터로 생성한 배열을 props로 자식 컴포넌트에 전달한다 */}
        <Route path="/" element={<List boardData={boardData} />} />
        <Route path="/list" element={<List boardData={boardData} />} />
        {/* 열람의 경우 게시물의 상세번호를 통해 객체를 선택해야 하므로 중첩라우터로 구현하고,
         일련번호는 :no로 작성되었다. */}
        <Route path="/view">
          <Route path=":no" element={<View boardData={boardData} />} />
        </Route>
        {/* Write 컴포넌트 내에서 글쓰기 처리를 할 수 있도록 
            App 컴포넌트에서 생성한 모든 state와 관련 함수를 props로 전달한다. */}
        <Route path="/write" 
          element={<Write 
          boardData={boardData} setBoardData={setBoardData}
          nextNo={nextNo} setNextNo={setNextNo}
          navigate={navigate} nowDate={nowDate}  
          />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
