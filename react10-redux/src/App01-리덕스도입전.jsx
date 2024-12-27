import { useState } from 'react';
import './App.css'

const Right1 = (props) => {
  return(
    <div>
      <h2>Right1</h2>
      <Right2 onMyPlus2={()=>{
        props.onMyPlus1();
      }} />
    </div>
  )
}
const Right2 = (props) => {
  return(
    <div>
      <h2>Right2</h2>
      <Right3 onMyPlus3={()=>{
        props.onMyPlus2();
      }} />
    </div>
  )
}
const Right3 = (props) => {
  /**
   * Right 최하위 컴포넌트에서는 Click 이벤트를 통해 부모에서 전달해 준 함수를 호출한다.
   * Right3 -> Right2 -> Right1 -> App 순서로 호출된다.(number state +1)
   */
  return(
    <div>
      <h2>Right3</h2>
      <input type="button" value={'+'} onClick={()=>{
        props.onMyPlus3();
      }}/>
    </div>
  )
}

/**
 * App컴포넌트로부터 전달 받은 props를 자식 컴포넌트로 재전달
 */
const Left1 = (props) => {
  return(
    <div>
      <h2>Left1 : {props.number1} </h2>
      <Left2 number2={props.number1}/>
    </div>
  )
}
const Left2 = (props) => {
  return(
    <div>
      <h2>Left2 : {props.number2} </h2>
      <Left3 number3={props.number2}/>
    </div>
  )
}
const Left3 = (props) => {
  return(
    <div>
      <h2>Left3 : {props.number3} </h2>
    </div>
  )
}
function App() {
  // 최상위 컴포넌트에서 state생성
  const [number, setNumber] = useState(1);
  return (
    <div className='root'>
      <h2>React - Redux : {number}</h2>
      <div id='grid'>
        {/* Left 컴포넌트 하위로 number를 전달 */}
        <Left1 number1={number} />
        {/* Right 컴포넌트 하위로 number변경 setter를 전달 */}
        <Right1 onMyPlus1={()=>{
          setNumber(number+1);
        }} />
      </div>
    </div>
  )
}

export default App;