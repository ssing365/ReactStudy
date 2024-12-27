import React from "react";

// 컴포넌트 선언과 동시에 export할 수 있다.
export default function AddPlayerForm(props) {
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
          props.onAddPlayer(playerName);
          e.target.player.value = '';
        }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={()=>{}} />
      <input type="submit" className="input" value="Add Player"
        onClick={()=>{ }} />
    </form>
  </>);
}