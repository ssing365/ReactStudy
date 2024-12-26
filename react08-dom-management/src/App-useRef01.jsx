import { useRef, useState } from 'react';
import './App.css'

/**
 * useRef
 *  : 컴포넌트의 생명주기 안에서 값을 유지한다.
 * 즉 새롭게 렌더링 되더라도 값이 변하지 않고 유지된다.
 * (컴포넌트의 생명주기는 DOM에 마운트~언마운트)
 * state와 동일하게 값을 마음대로 변경할 수 있지만, 값이 변경될 때 렌더링은 되지 않는다.
 * 즉 변경 시 렌더링은 되지 않아야할 상황에 유용하다.
 * 또한 JS의 getElementById()와 같이 DOM요소에 접근할 수 있다.
 */

function App() {
  console.log("렌더링됨!");

  // state로 상수 생성
  const [count, setCount] = useState(0);
  // useRef로 상수 생성
  const countRef = useRef(0);
  /**
   * useRef를 통해 생성한 변수는 current라는 Key를 가진 객체를 반환한다.
   * 즉 접근시에는 변수.current 형태로 기술해아한다.
   */
  console.log("countRef", countRef);
  console.log("count", count);

  // state 증가
  const increaseCountState = () => {
    setCount(count+1);
  }

  // ref 증가
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log("Ref", countRef.current);
  }

  return (
    <>
      <p>State : {count}</p>
      <p>Ref : {countRef.current}</p>
      {/* 버튼을 누를 때마다 state가 변경되므로 화면이 새롭게 렌더링 된다. */}
      <button onClick={increaseCountState}>state증가</button>
      {/* Ref가 변경되지만 화면은 새롭게 렌더링되지 않는다. */}
      <button onClick={increaseCountRef}>Ref증가</button>
    </>
  )
}

export default App;