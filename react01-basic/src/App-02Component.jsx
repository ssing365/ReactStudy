import "./App.css";

//컴포넌트는 일반적인 JS의 함수와 동일하게 제작한다.
//function MyBody(){
const MyBody = () => { // 화살표 함수로 컴포넌트 작성
  /**
   * 함수형 컴포넌트에서 return은 UI를 화면상에 렌더링하는 역할을 한다.
   * 따라서 반드시 기술해야한다. RETURN 필수 !!
   */
  return (
    <>
    {/**
     * 컴포넌트에서 UI는 반드시 최상위 엘리먼트가 1개여야 한다.
     * React에서는 이를 위해 Fragment(<></>) 태그를 제공한다.
     */}
      <ol>
        <li>프론트엔드</li>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>JQuery</li>
        </ul>
        <li>백엔드</li>
        <ul>
          <li>Java</li>
          <li>Oracle</li>
          <li>JSP</li>
          <li>SpringBoot</li>
        </ul>
      </ol>
    </>
  );
};

/**
 * Vite를 통해 React프로젝트를 생성하면 최상위 컴포넌트는 App
 * App 하위에 자식 컴포넌트를 추가하면서 웹애플리케이션을 개발하게 된다.
 */
function App() {
  return (
    <>
      <h2>React - 기본</h2>
      {/** 부모컴포넌트 하위에 자식컴포넌트를 삽입할 때는 HTML태그처럼 기술하면 된다.
        * JSX는 XML의 문법을 따르므로 반드시 시작태그와 종료태그가 함께 기술돼야한다.
        * 하나의 태그만 쓰려면 종료를 표현하는 / 가 있어야한다.
        */}
      <MyBody />
    </>
  );
}

export default App;
