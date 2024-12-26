import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countNumber, setCountNumber] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  /**
   * Step 1: 일반적인 화살표 함수 선언
   *  state변경에 의해 App컴포넌트가 새롭게 렌더링 되면 
   *  이 함수는 그때마다 새로운 참조값을 할당한다.
   *  즉 참조값이 계속 바뀌므로 useEffect가 지속 실행된다. 
   *  JS에서 함수는 객체이기 때문이다.
   */
  // const somethingGood = () => {
  //   console.log(`somethingGood 호출 : ${countNumber}, ${randomNumber}`);
  //   return
  // };

  /**
   * Step2 : 함수에 useCallback을 적용하여 렌더링 시 딱 한 번만 함수를 캐시에 저장한다.
   *  하지만 의존성 배열에 빈 값을 주어 딱 한 번만 실행되므로 state의 변경을 감지하지 못한다.
   *  최초 실행 시의 초깃값 0만 출력된다.
   * Step3 : countNumber가 변경될 때마다 새롭게 메모이제이션되므로 변경된 state 갑지 가능
   *  단, randomNumber는 값이 다를 수 있다.
   */
  const somethingGood = useCallback(() => {
    console.log(`somethingGood 호출 : ${countNumber}, ${randomNumber}`);
    return;
  // }, []); // Step2
  }, [countNumber]); // Step3

  useEffect(()=>{
    console.log(`somethingGood() or randomGood() 변경됨`);
  },[somethingGood]);

  return (
    <>
      <h2>useCallback()</h2>
      {/* 스핀박스를 통해 숫자를 증감시켜 state변경 */}
      <input type="number" value={countNumber}
        onChange={(e)=> setCountNumber(e.target.value)}/>
      {/* 클릭할 때마다 난수 생성 후 state변경 */}
      <button onClick={()=>{
        setRandomNumber(Math.random());
      }}>
        난수 : {randomNumber}
      </button>
      <br />
      {/* 버튼 누를 때마다 함수 호출 */}
      <button onClick={somethingGood}>somethingGood 호출</button>
    </>
  );
}

export default App;
