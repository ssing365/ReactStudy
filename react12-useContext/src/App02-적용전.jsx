import { useState } from "react";
import "./App.css";

const Page = ({ isDark, setIsDark }) => {
  return (
    <>
      <Header isDark={isDark} />
      <Content isDark={isDark} />
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </>
  );
};

const Header = ({ isDark }) => {
  // isDark 값에 따라 배경색과 글자색 토글
  return (
    <header
      className="header"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <h1>Welcome 헝딜동..!!</h1>
    </header>
  );
};

const Content = ({ isDark }) => {
  return (
    <div
      className="content"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <p>헝딜동 반가워 ㅋㅋ</p>
    </div>
  );
};

const Footer = ({ isDark, setIsDark }) => {
  // 다크모드 토글 함수
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      className="footer"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
      }}
    >
      <input
        type="button"
        value="Dark Mode"
        className="button"
        onClick={toggleTheme}
      />
    </div>
  );
};

function App() {
  // 다크모드 변경을 위한 state
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      {/* state로 선언한 변수와 함수를 자식 컴포넌트로 전달 */}
      <Page isDark={isDark} setIsDark={setIsDark}></Page>
    </>
  );
}

export default App;
