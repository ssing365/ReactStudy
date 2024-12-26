import { useRef, useState } from 'react';
import './App.css';

function App() {
  // 화면의 새로운 렌더링을 위한 state 정의
  const [renderer, setRenderer] = useState(0);
  // ref를 0으로 정의
  const countRef = useRef(0);
  // 일반 변수를 0으로 정의
  let countVar = 0;
  
  // state를 변경해서 화면을 새롭게 렌더링한다
  const doRendering = () => {
    setRenderer(renderer + 1);
  };

  // Ref를 1 증가
  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log("ref", countRef.current);
  };

  // 일반변수를 1 증가
  const increaseVar = () => {
    countVar = countVar + 1;
    console.log("var", countVar);
  }

  const printResult = () => {
    console.log(`ref:${countRef.current}, var: ${countVar}`);
  }

  /**
   * state를 변경시키면 그때마다 화면이 새롭게 렌더링된다.
   * 이것은 App()을 재호출하는 것이므로 지역변수로 선언된 countVar는 그때마다 0으로 초기화된다.
   * 즉 컴포넌트의 생명주기 안에서 값을 유지하고 싶다면 state나 ref를 사용해야되고
   * 그렇지 않다면 일반 변수를 사용하면 된다.
   */
  return (
    <>
      <p>Ref : {countRef.current}</p>
      <p>Var : {countVar}</p>
      <button onClick={doRendering}>렌더링</button>
      <button onClick={increaseRef}>Ref증가</button>
      <button onClick={increaseVar}>Var증가</button>
      <button onClick={printResult}>Ref/Var출력</button>
    </>
  );
}

export default App;