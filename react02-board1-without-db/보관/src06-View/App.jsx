import "./App.css";
import { useState } from "react";

/**
 * 컴포넌트를 모듈화하면 JS혹은 JSX로 제작하게 되는데,
 * 이를 임포트할 때는 확장자는 상관없이 경로에 대해서면 명시하며 ㄴ된다.
 */
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
      <h3>컴포넌트 준비중입니다 ^^</h3>
      <a href="/">react02-board1-without-db/srcHome 바로가기</a>
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

  const [mode, setMode] = useState("list");

  // 선택한 게시물의 일련번호 저장. 최초 선택한 게시물이 없으므로 null로 초기화
  const [no, setNo] = useState(null);

  let articleComp, navComp, titleVar, selectRow ;

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
    articleComp = 
      <ArticleList
        boardData={boardData}
        onChangeMode={(no) => {
          console.log("선택한 게시물 번호 : " + no);
          // 화면을 열람으로 전환
          setMode("view");
          // 선택한 게시물의 일련번호로 state 변경
          setNo(no);
        }}
      ></ArticleList>
  }
  else if (mode === "view") {
    titleVar = "게시판-읽기(props)";
    navComp = 
      <NavView
        onChangeMode={(pmode) => {
          setMode(pmode);
        }}
      ></NavView>

      console.log("현재 no : ", no, typeof(no));
      // 선택한 게시물의 일련번호 일치하는 객체를 검색
      for(let i=0; i<boardData.length; i++){
        if(no===boardData[i].no){
          // 일치하는 게시물이 있다면 변수에 저장
          selectRow = boardData[i];
        }
      }
      // 검색된 게시물을 props를 통해 자식 컴포넌트로 전달
      articleComp = <ArticleView selectRow={selectRow}/>;    
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