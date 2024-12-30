import { useReducer, useState } from "react";
import "./App.css";

// Action에서 사용할 값 정의
const ActionTypes = {
  depo: "deposit",
  with: "withdraw",
};

// 리듀서 함수 정의
const myReducer = (nowState, myAction) => {
  console.log("리듀서 함수 호출", nowState, myAction);
  /**
   * Action을 분석해서 입출금을 처리한다.
   * 변경된 값을 반환하면 즉시 적용되어 새로 렌더링된다.
   */
  switch (myAction.mode) {
    case ActionTypes.depo:
      return nowState + myAction.amount;
    case ActionTypes.with:
      return nowState - myAction.amount;
    default:
      return nowState;
  }
};

function App() {
  // state선언. 입출금 금액 변경
  const [number, setNumber] = useState(0);
  // Reducer선언. money는 0으로 초기화. dispatch와 reducer 함수 선언
  const [money, myDispatch] = useReducer(myReducer, 0);

  return (
    <>
      <h2>useReducer App</h2>
      <p>잔고 : {money}원</p>
      <input
        // 스핀박스를 통해 1000원 단위로 증감
        type="number" value={number} step={1000} 
        onChange={(e) => {
          setNumber(parseInt(e.target.value));
        }}
      />
      {/* 앞서 선언한 상수를 이용해 Action 전달 */}
      <button
        onClick={() => {
          myDispatch({ mode: ActionTypes.depo, amount: number });
        }}
      >입금</button>
      <button
        onClick={() => {
          myDispatch({ mode: ActionTypes.with, amount: number });
        }}
      >출금</button>
    </>
  );
}
export default App;
