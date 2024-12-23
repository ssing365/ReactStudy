import "./App.css";
// 라우터 처리를 위한 Import
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

function List(props) {
  return (
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        {/** <a href='write'>글쓰기</a> */}
        <Link to="/write">글쓰기</Link>
      </nav>
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
              <td>
                {" "}
                <a href="/view">오늘은 React공부하는 날</a>
              </td>
              <td className="cen">낙짜쌤</td>
              <td className="cen">2030-05-05</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

function View(props) {
  return (
    <>
      <header>
        <h2>게시판-읽기</h2>
      </header>
      <nav>
        {/* <a href="/list">목록</a>&nbsp;
        <a href="/edit">수정</a>&nbsp;
        <a href="/delete">삭제</a> */}
        <Link to="/list">목록</Link>&nbsp;
        <Link to="/edit">수정</Link>&nbsp;
        <Link to="/delete">삭제</Link>
      </nav>
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
                열심히 해봅시당 <br /> 열공합시당{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

function Write(props) {
  return (
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        {/* <a href="/list">목록</a> */}
        <Link to="/list">목록</Link>
      </nav>
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
    </>
  );
}

function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. <br />
      </p>
    </>
  );
}

/** 라우터 처리를 위한 BrowserRouter 컴포넌트는 App컴포넌트를 감싸는 형식으로 사용한다. */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 첫 진입 시에는 게시판의 목록 렌더링 */}
        <Route path="/" element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/view" element={<View />} />
        <Route path="/write" element={<Write />} />
        {/* 앞에서 설정한 경로 외에는 모두 404 처리 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
