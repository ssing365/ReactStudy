import { useState } from "react";
import "./App.css";

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

// 목록의 네비게이션
function NavList(props) {
  return (
    <nav>
      <a
        href="/"
        onClick={function (event) {
          event.preventDefault();
          props.onChangeMode();
        }}
      >
        글쓰기
      </a>
    </nav>
  );
}

//내용보기의 네비게이션
function NavView(props) {
  // 띄어쓰기 할 때는 &nbsp; 혹은 {" "}를 사용한다.
  return (
    <nav>
      <a
        href="/"
        onClick={function (event) {
          event.preventDefault();
          props.onChangeMode("list");
        }}
      >
        목록
      </a>
      &nbsp;
      <a
        href="/"
        onClick={function (event) {
          event.preventDefault();
          props.onChangeMode("edit");
        }}
      >
        수정
      </a>{" "}
      <a
        href="/"
        onClick={function (event) {
          event.preventDefault();
          props.onChangeMode("delete");
        }}
      >
        삭제
      </a>{" "}
    </nav>
  );
}

// 작성하기의 네비게이션
function NavWrite(props) {
  return (
    <nav>
      <a
        href="/"
        onClick={function (event) {
          event.preventDefault();
          props.onChangeMode();
        }}
      >
        목록
      </a>
    </nav>
  );
}

// 게시판 목록
function ArticleList(props) {
  const lists = [];
  for (let i = 0; i < props.boardData.length; i++) {
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        {/** 제목 클릭하면 열람으로 전환. 'read/번호'형식으로 링크 설정 */}
        <td>
          <a
            href={"/read/" + row.no}
            onClick={(event) => {
              event.preventDefault();
              //각 게시물의 일련번호를 전달
              props.onChangeMode(row.no);
            }}
          >
            {row.title}
          </a>
        </td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    );
  }
  return (
    <article>
      <table id="boardTable">
        <thead>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </thead>
        <tbody>
          {/** 배열에 추가한 데이터를 여기서 출력 */}
          {lists}
        </tbody>
      </table>
    </article>
  );
}

function ArticleView(props) {
  return (
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React 공부하는 날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2023-05-05</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              열심히 해봅시당 <br /> 열공합시당
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

function ArticleWrite(props) {
  return (
    <article>
      <form action="">
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" name="writer" />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea name="contents" id="" cols="22" rows="3"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
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
