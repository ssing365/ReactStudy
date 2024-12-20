import "./App.css";
import { useState } from "react";

import NavList from './components/navigation/NavList'
import NavView from './components/navigation/NavView'
import NavWrite from './components/navigation/NavWrite'
import ArticleList from './components/article/ArticleList'
import ArticleView from './components/article/ArticleView'
import ArticleWrite from './components/article/ArticleWrite'

// 준비중 컴포넌트
function ReadyComp() {
  return (
    <div>
      <h3>컴포넌트 준비중입니다 :)</h3>
      <a href="/">Home 바로가기</a>
    </div>
  );
}

// 모든 페이지에서 공통으로 사용할 Header 컴포넌트. 타이틀만 변경될 예정
function Header({ title }) {
  console.log("props", title);
  return (
    <header>
      <h2>{title}</h2>
    </header>
  );
}

function App() {
  const boardData = [
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
  ];

  /** 화면 전환을 위한 state생성.
   * 변수명은 mode, 초깃값은 list, 변경 시 사용할 함수는 setMode()로 지정
   */
  const [mode, setMode] = useState("list");

  // 컴포넌트와 타이틀을 저장할 변수
  let articleComp, navComp, titleVar;

  // mode의 값에 따라 화면 전환
  if (mode === "list") {
    titleVar = "게시판-목록(props)";
    navComp = (
      <NavList
        onChangeMode={() => {
          setMode("write");
        }}
      ></NavList>
    );
    articleComp = (
      <ArticleList
        boardData={boardData}
        onChangeMode={(no) => {
          console.log("선택한 게시물 번호 : " + no);
          setMode("view");
        }}
      ></ArticleList>
    );
  } else if (mode === "view") {
    titleVar = "게시판-읽기(props)";
    navComp = (
      <NavView
        onChangeMode={(pmode) => {
          setMode(pmode);
        }}
      ></NavView>
    );
    articleComp = <ArticleView />;
  } 
  else if (mode === 'write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite />
  }
  else {
    navComp = <ReadyComp />;
    articleComp = "";
  }

  // 모드 변화에 따른 컴포넌트 렌더링
  return (
    <>
      <Header title={titleVar} />
      {navComp}
      {articleComp}
    </>
  );
}

export default App;