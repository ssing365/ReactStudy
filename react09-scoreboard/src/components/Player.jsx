import React from "react";
import { useState } from "react";
import Counter from '../components/Counter';
import { Link } from 'react-router-dom'
import EditPlayerForm from "./EditPlayerForm";

export default function Player(props) {
  let row = props.playerData;

  /** 수정폼 출력 state */
  const [showEdit, setShowEdit] = useState(false);
  let editForm;
  if (showEdit === false) {
    editForm = '';
  } else {
    editForm = <EditPlayerForm playerName={row.name} playerIdx={row.idx}
      onEditPlayer={props.onEditPlayer}
      showEdit={showEdit} setShowEdit={setShowEdit} />
  }

  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={(e) => {
          console.dir(e.target)
          // JSX에서는 window객체를 이용해서 하위 함수를 호출한다.
          if (window.confirm('삭제하시겠습니까?')) {
            props.onDelete(row.idx)
          }
        }}> x </button>
        <Link to='/' onClick={(e) => {
          e.preventDefault();
          console.log(showEdit)
          setShowEdit(!showEdit)
          console.log(showEdit)
        }}
        >{row.name}</Link>
      </span>
      <Counter idx={row.idx} score={row.score}
        onChangeScore={props.onChangeScore}
      />
    </div>
    {editForm}
  </>);
}