import { useRef } from "react";
import Navi from "./Navi";

function ChatStart(){
  // <input> 태그의 DOM을 활용하기 위해 useRef 훅 생성
  const refRoom = useRef(); // 채팅방의 이름
  const refId = useRef(); // 접속자의 아이디

  /**
   * open()함수를 통해 채팅창을 팝업으로 오픈
   * 형식 ] open('팝업창 요청 url', 'target : 팝업창 이름', 'attribute : 팝업창 속성')
   * 두 번째 인수인 창의 이름을 부여하면 새로운 창을 열었을때 같은 창이 새로고침되서 오픈된다.
   * 계속 새 창을 오픈하려면 이름을 부여하지 않고 비워놓으면 된다.
   */
  const openChatWin = () => {
    window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=500,height=700');
  }

  return(
    <>
      <Navi/>
      <h2>Firebase - Realtime Databsbe Chatting</h2>
      {/* 앞에서 생성한 Ref변수를 <input>태그에 추가하여 DOM에 접근 */}
      방명 : <input type="text" name="roomId" id="" value='room1' ref={refRoom} /> <br />
      대화명 : <input type="text" name="userId" id="" ref={refId} /> <br />
      <button onClick={openChatWin}>채팅시작</button>
    </>
  )
}

export default ChatStart;