import React from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Stopwatch(props) {

  /** 스탑워치가 동작중인지 확인하기 위한 state */
  // false면 멈춘 상태
  const [timerFlag, setTimerFlag] = useState(false);

  // 타이머에서 사용할 시간
  let [ticker, setTicker] = useState(0);

  // setInterval()의 반환값을 저장 후 clearInterval()에서 중지할 때 사용
  let timerRef = useRef(0);

  /** 스탑워치 시작 */
  const startTimer = () => {
    ticker++;
    // 1초에 한 번씩 state 변경
    timerRef.current = setInterval(() => {
      console.log('tik tok');
      // setter 함수가 호출될 때마다 새로 렌더링된다
      setTicker(ticker++);
    }, 1000);
  }

  /** 스탑워치 중지(Timer 변수 이용. 여기서는 Ref를 사용) */
  const stopTimer = () => {
    clearInterval(timerRef.current);
  }
  /**
   * timerRef.current가 1씩 증가하는 이유
   * startTimer 함수에서 setInterval이 실행될 때마다 새로운 타이머 ID가 할당되기 때문
   */
  console.log("timerRef~~~~~~~~~", timerRef.current);

  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      {/* 시간 표시 */}
      <span className="stopwatch-time">{ticker}</span>
      {/* 시작/중지 버튼 */}
      <button onClick={()=>{ 
        // 시작/중지를 토글
        setTimerFlag(!timerFlag);
        (timerFlag === true) ? stopTimer() : startTimer() ;
       }}>{(timerFlag === false) ? 'Start' : 'Stop'}</button>
      <button onClick={()=>{ 
        (timerFlag===true) ? alert("StopWatch가 동작중입니다.") : setTicker(0);
       }}>Reset</button>
    </div>
  </>);
}