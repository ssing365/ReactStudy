import { useRef } from "react";

function ChatStart() {
  // <input> 태그의 DOM을 활용하기 위해 useRef 훅 생성
  const refRoom = useRef(); // 채팅방의 이름
  const refId = useRef(); // 접속자의 아이디

  const openChatWin = () => {
    window.open(`/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=600,height=850');
  };

  return (
    <>
      <h2>톡토오톡</h2>
      {/* 앞에서 생성한 Ref변수를 <input>태그에 추가하여 DOM에 접근 */}
      방명 :{" "}
      <input type="text" name="roomId" id="" value="room1" ref={refRoom} />{" "}
      <br />
      대화명 : <input type="text" name="userId" id="" ref={refId} /> <br />
      <button onClick={openChatWin}>채팅시작</button>
    </>
  );
}

export default ChatStart;
