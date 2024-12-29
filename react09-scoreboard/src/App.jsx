import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import AddPlayerForm from "./components/AddPlayerForm";
import Player from "./components/Player";

function App() {
  const [playerData, setPlayerData] = useState([
    { idx: 1, name: "홍길동", score: 10 },
    { idx: 2, name: "손오공", score: 20 },
    { idx: 3, name: "유비", score: 30 },
    { idx: 4, name: "달타냥", score: 40 },
  ]);

  const [nextVal, setNextVal] = useState(5);

  /** 플레이어 추가 */
  const addPlayerProcess = (pName) => {
    console.log("onAddPlayer", pName);
    let addPlayer = { idx: nextVal, name: pName, score: 0 };

    // 추가 후 화면 리렌더링
    let copyPlayers = [...playerData];
    copyPlayers.push(addPlayer);
    setPlayerData(copyPlayers);

    // 추가 후 시퀀스 증가
    setNextVal(nextVal + 1);
  };

  /** 플레이어 수정 */
  const editPlayerProcess = (idx, pName) => {
    console.log("수정", idx, pName);
    let newPlayersData = playerData.filter((row) => {
      if (row.idx === idx) {
        row.name = pName;
      }
      return row;
    });
    setPlayerData(newPlayersData)
  };

  /** 점수 증감 */
  // 매개변수는 증가 감소 여부, 플레이어 번호
  const scoreChangeProcess = (flag, playerIdx) => {
    console.log("idx", playerIdx, "flag", flag);
    let copyPlayers = [...playerData];
    copyPlayers.forEach((row) => {
      if (row.idx === playerIdx) {
        console.log(row.name);
        if (flag === "+") row.score += 5;
        else {
          if (row.score < 5) {
            alert("점수는 0이하로 내려갈 수 없습니다. ");
            return;
          }
          row.score -= 5;
        }
      }
    });
    setPlayerData(copyPlayers);
  };

  /** 플레이어 삭제 */
  const deletePlayerProcess = (playerIdx) => {
    console.log("idx", playerIdx);
    let copyPlayers = [...playerData];
    let newPlayers = copyPlayers.filter((current) => {
      return current.idx !== playerIdx;
    });
    setPlayerData(newPlayers);
  };

  return (
    <>
      <Header title="My Scoreboard" playersData={playerData} />
      {
        playerData.map((playerRow) => (
          <Player
            key={playerRow.idx}
            playerData={playerRow}
            onChangeScore={scoreChangeProcess}
            onDelete={deletePlayerProcess}
            onEditPlayer={editPlayerProcess} />

        ))
      }
      {/* 플레이어를 추가하는 함수를 props로 전달 */}
      <AddPlayerForm onAddPlayer={addPlayerProcess}></AddPlayerForm>
    </>
  );
}

export default App;
