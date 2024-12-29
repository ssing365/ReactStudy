import React from "react";
import { useState } from "react";

// 컴포넌트 선언과 동시에 export할 수 있다.
export default function EditPlayerForm(props) {
  const [playerName, setPlayerName] = useState(props.playerName)
  return (<>
    <form className="form" noValidate
        onSubmit={(e)=>{
          e.preventDefault();
          let playerName = e.target.player.value;
          if(playerName === ''){
            alert("선수 이름을 입력하세요");
            playerName.focus();
            return
          }
          
          props.onEditPlayer(props.playerIdx, playerName);
          props.setShowEdit(false);
          e.target.player.value = '';
        }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="수정할 이름을 입력하세요" required 
         onChange={(e)=>{
          console.log(e.target)
          setPlayerName(e.target.value)
        }} value={playerName} />
      <input type="submit" className="input" value="수정"
        onClick={()=>{ }} />
    </form>
  </>);
}