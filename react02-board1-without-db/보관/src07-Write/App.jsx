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
  /**
   * 데이터의 추가 삭제가 있을 때 새로 렌더링하기 위해
   * 기존의 객체형 배열을 state로 변환한다.
   */
  const [ boardData, setBoardData ] = useState([
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

  const [mode, setMode] = useState("list");
  // 선택한 게시물의 일련번호 저장. 최초 선택한 게시물이 없으므로 null로 초기화
  const [no, setNo] = useState(null);
  const [nextNo, setNextNo] = useState(4);

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
      // for(let i=0; i<boardData.length; i++){
      //   if(no===boardData[i].no){
      //     // 일치하는 게시물이 있다면 변수에 저장
      //     selectRow = boardData[i];
      //   }
      // }

      /** 퀴즈
       *  일반 for문으로 작성된 부분을 reduce()함수로 수정해서 동일한 결과가 출력되도록 구현하시오.       * 
       */
      boardData.reduce(function(pV,cV){
          if(no === cV.no){
            selectRow = cV
            return;
          }
       })
      
      // 검색된 게시물을 props를 통해 자식 컴포넌트로 전달
      articleComp = <ArticleView selectRow={selectRow}/>;    
  } 
  else if (mode === 'write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>

    articleComp = <ArticleWrite writeAction={(t, w, c)=>{
      console.log("App.js", t, w, c);

      // 현재 날짜
      let dateObj = new Date();
      let year = dateObj.getFullYear();
      // getMonth() : 0~11까지를 반환하므로 +1해야 현재 월을 구할 수 있음
      let month = ("0" + (1 + dateObj.getMonth())).slice(-2);
      let day = ("0" + dateObj.getDate()).slice(-2);
      /**
       * 월과 일이 한자리인 경우에는 01과 같이 설정되고
       * 두자리인 경우에는 031과 같이 문자열이 생성되므로 
       * slice()함수를 통해 끝에서 두자리만 잘라낸다.
       * 따라서 0000-00-00의 포맷으로 날짜를 생성할 수 있다.
       */
      let nowDate = year + "-" + month + "-" + day;

      /**
       * 추가할 객체 생성
       * 일련번호는 시퀀스용 state인 nextNo를 사용한다.
       */
      let addBoardData = {no:nextNo, title:t, writer:w, 
        contents:c, date: nowDate};

      /** 추가 방법1 (권장) */ 
      // 스프레드 연산자로 복사본 배열 데이터를 하나 생성한다.
      let copyBoardData = [...boardData];
      // 복사된 배열에 새로운 객체를 추가한다.
      copyBoardData.push(addBoardData);
      // 복사된 배열을 통해 state를 변경한다.
      setBoardData(copyBoardData);
      /**
       * 배열의 복사본을 만들면 메모리에는 새로운 배열이 하나 생성된다.
       * 복사본에 데이터를 추가한 후 이를 통해 state를 변경한다.
       * 새롭게 생성된 배열의 참조값을 통해 state를 변경하게 되므로 React는 변화를 감지하여 
       * 새로운 렌더링을 하게도니다.
       */

      /** 추가 방법2 */
      // boardData.push(addBoardData);
      // console.log(boardData);
      // setBoardData(boardData);
      /** 이 경우 배열 데이터의 참조값에 대한 변화가 없으므로
       * React는 변화를 인식하지 못하여 state를 변경해도 새로운 렌더링이 되지 않는다.
       */

      setNextNo(nextNo+1);
      setMode('list');
    }}/>
    
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