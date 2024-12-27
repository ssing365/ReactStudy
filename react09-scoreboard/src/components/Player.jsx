import React from "react";
import Counter from '../components/Counter';
import { Link } from 'react-router-dom'

export default function Player(props) {
  let row = props.playerData;
  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={(e) => {
          console.dir(e.target)
          // JSX에서는 window객체를 이용해서 하위 함수를 호출한다.
          if(window.confirm('삭제하시겠습니까?')){
            props.onDelete(row.idx)
          }
         }}> x </button>
         <Link to='/' onClick={(e)=>{
          e.preventDefault();
          props.setEditIdx(row.idx)}}
          >{row.name}</Link>
      </span>
      {/* App컴포넌트에서 전달받은 함수(onChangeScore)를 자식 컴포넌트로 다시 전달한다.
      React는 Top-down 방식으로 데이터를 전달하는 구조를 가지고 있으므로
      컴포넌트의 구조가 복잡해질수록 상태관리가 어려워진다는 단점이 있다. (->Redux) */}
      <Counter idx={row.idx} score={row.score}
        onChangeScore={props.onChangeScore}
         />
    </div>
  </>);
}