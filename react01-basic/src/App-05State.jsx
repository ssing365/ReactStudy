/** 현재 문서에서 useState 리액트 훅을 사용하겠다는 의미로
 *  외부 기능을 현재 문서에 포함시킨다. */
import { useState } from "react";
import "./App.css";

// Top 컴포넌트 정의
function Top(props){
  return(
    <h2><a href="/" onClick={(event)=>{
      // 이벤트 객체를 통해 화면의 새로고침 차단
      event.preventDefault();
      /**
       * props로 전달된 함수 호출.
       * 인수를 'both'로 전달하여 state를 변경한다.
       */
      props.myModeChange('both');
    }}>React - State 변경하기</a></h2>
  );
}

function MyCont1(props){
  return(
    <>
      <li><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.myModeChange('front');
      }}>프론트앤드</a></li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>JQuery</li>
      </ul>
    </>
  );
}

function MyCont2(props){
  return(
    <>
      <li><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.myModeChange('back');
      }}>백앤드</a></li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li>
        <li>Spring Boot</li>
      </ul>
    </>
  );
}

/**
 * React Hook(훅)
 * : 함수형 컴포넌트에서 state와 수명주기(Life Cycle)을 연동할 수 있게 해주는 특수한 함수.
 * Hook은 import 후 useXXX()와 같은 함수를 아래와 같이 사용한다.
 * 
 * useState() 
 * : 리액트에서 상태값을 가지는 state의 값을 초기화 및 변경할 때 사용
 *   이 함수의 반환값은 2개의 요소를 반환하는 배열이다.
 *     0번 요소 - state 값을 저장하는 변수
 *     1번 요소 - state 값을 변경하는 함수
 *   => 구조 분해 할당으로 주로 사용한다.
 *      const [ms, setMs] = useState(99); (ms의 초기값은 99)
 * 
 */
function App() {
  /**
   * UI전환을 위한 state 생성.
   * state의 변수명은 mode, 초깃값은 'both'
   * 이를 변경하기 위한 함수는 setMode()로 정의
   */
  const [mode, setMode] = useState('both');

  // 컴포넌트 저장을 위한 변수 선언
  let contents = '' ;
  // mode의 값이 front면 MyCont1 컴포넌트만 렌더링
  if(mode === 'front'){
    contents = <>
      {/** 각 컴포넌트는 myModeChange라는 함수를 Props로 전달하는데,
       *  state인 mode 값을 매개변수를 통해 변경하는 기능을 가지고 있다.
       */}
      <MyCont1 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont1>
    </>
  }
  else if(mode === 'back'){
    contents = <>
      <MyCont2 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont2>
    </>
  }
  else{
    contents = <>
      <MyCont1 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont1>
      <MyCont2 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont2>
    </>
  }
  return (<>
      <Top myModeChange={(mode)=>{
        setMode(mode);
      }}></Top>
      <ol>
        {/**
         * 앞에서 if문을 통해 mode 값에 따라 설정된 컴포넌트를 렌더링한다.
         */}
        {contents}
      </ol>
    </>);
}

export default App;
