import { useEffect, useState } from "react";
import "./App.css";

/**
 * useEffect
 * : 함수형 컴포넌트에서 LifeCycle(수명주기)를 사용하기 위한 Hook
 * 컴포넌트 내부에서 발생하는 데이터 가져오기, 구독 설정, 수동으로 DOM조작 등과 같은 작업 수행
 * 컴포넌트가 렌더링 된 후 실행할 코드를 정의할 때 주로 사용
 */

// 컴포넌트의 렌더링은 해당 함수가 호출되어 실행된다는 의미
function LifeGood(props){
  /** 이 컴포넌트에서 제일 먼저 실행되는 코드. 
   * 즉 렌더링 전에 실행할 코드가 있다면 이 부분에 작성한다. */
  console.log("#Life", "LifeGood==> 1.컴포넌트 실행(함수 호출)");

  // state 생성 : 컴포넌트는 state가 변경될 때마다 새로 렌더링한다.
  const [myRandomNum, setMyRandomNum] = useState(props.initNumber);
  const [myCount, setMyCount] = useState(1);

  /**
   * 컴포넌트가 렌더링된 후 실행된다.
   * 첫 실행에서는 마운트만 되고, 두 번째 실행부터 언마운트, 마운트 순으로 실행된다
   * (마운트 : 컴포넌트를 통해 생성된 UI를 웹브라우저에 출력하는 것. 반대로 제거하는 건 언마운트)
   * 
   * useEffect의 리턴문은 마운트가 되었던 페이지에서만 실행됨 ?? -> 네
   */
  useEffect(()=>{
    console.log("#Life", "useEffect실행==> 3. 컴포넌트 마운트");
    return()=>{
      console.log("#Life", "useEffect실행==> 4. 컴포넌트 언마운트");
    }
  },[myRandomNum]);
  /**
   * 1. 의존성배열(두 번째 인자) 없음
   * : 2개의 버튼을 누를 때마다 useEffect안의 코드가 실행된다.
   * 
   * 2. 의존성배열에 빈 배열 할당
   * : 최초 실행시에만 useEffect안의 코드가 실행되고 그 이후에는 실행되지 않는다.
   * 
   * 3. 의존성배열에 state변수 할당
   * : 배열에 들어있는 state가 변경될 때마다 useEffect안의 코드가 실행된다.
   */

  /**
   * 앞에서 useEffect가 먼저 선언되었지만 수명주기에서는 렌더링이 먼저 수행된다
   * 즉 화면에 UI가 먼저 표시된 후 useEffect가 실행된다.
   */
  console.log("#Life", "useEffect실행==> 2.렌더링(return문)");
  return(
    <>
      <h4>함수형 컴포넌트의 수명주기 함수</h4>
      {/* state 출력 */}
      <p>난수 : {myRandomNum}</p>
      <p>카운트 : {myCount}</p>

      {/* setState */}
      <input type="button" name="" id="" value={"난수생성"} onClick={()=>{
        setMyRandomNum(Math.random())
      }}/>
      <input type="button" name="" id="" value={"카운트"} onClick={()=>{
        setMyCount(myCount+1);
      }}/>
    </>
  )
}

function App() {
  return (<>
    <h2>React Hook - useEffect</h2>
    <LifeGood initNumber={1}/>
  </>);
}

export default App;