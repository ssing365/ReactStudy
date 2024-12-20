import "./App.css";

function Header(props) {
  return (
    <header>
      <h2>게시판 - 목록</h2>
    </header>
  );
}
function Nav() {
  return (
    <nav>
      <a href="/">글쓰기</a>
    </nav>
  );
}
function Article() {
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
          <tr>
            <td className="cen">1</td>
            <td>오늘은 React공부하는 날</td>
            <td className="cen">낙짜쌤</td>
            <td className="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Article />
    </>
  );
}

export default App;
