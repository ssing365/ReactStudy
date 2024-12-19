import "./App.css";

/**
 * JSX에서 스타일 적용하는 방법
 * - class속성은 className으로 변경해야함(class는 예약어). id속성은 그대로 가능
 * - style속성을 통해 인라인 방식을 사용할 때는 
 *   컬리브레이스(중괄호)로 JSON객체 형태의 값을 부여해야함
 */
function App() {
  // JSON객체로 스타일 정의
  const mystyle ={
    color : 'white',
    backgroundColor : 'DodgerBlue',
    padding : '10px',
    fontFamily : 'Verdana'
  };
  return (<>
      <h2>React - Style지정하기</h2>
      <ol>
        {/** 스타일 속성을 직접 부여할 때는 아래와같이 중괄호 사용 */}
        <li style={{color:'red'}}>프론트엔드</li>
        <ul style={mystyle}>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>JQuery</li>
        </ul>
        {/** App.css에 스타일시트 정의 */}
        <li className="backEnd">백엔드</li>
        <ul>
          <li id="backEndSub">Java</li>
          <li class="warnings">Oracle</li>
          <li>JSP</li>
          <li>SpringBoot</li>
        </ul>
      </ol>
    </>);
}

export default App;
