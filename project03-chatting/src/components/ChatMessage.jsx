// Realtime DB연결 및 객체 얻어오기
import { realtime } from "../realtimeConfig";
// Realtime DB 사용을 위한 함수
import { child, onValue, push, ref, set } from "firebase/database";
// React Hook
import { useRef, useEffect, useState } from "react";
// Router Hook
import { useSearchParams } from "react-router-dom";

// 스크롤 바를 최하단으로 내려주기 위한 JS 함수
const scrollTop = (chatWindow) => {
  console.log("scrollTop 호출됨");
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const nowDate = () => {
  let dateObj = new Date();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var hours = ("0" + dateObj.getHours()).slice(-2);
  var minutes = ("0" + dateObj.getMinutes()).slice(-2);

  return month + "-" + day + " " + hours + ":" + minutes;
};

function ChatMessage() {
  /** 쿼리스트링으로 전달된 파라미터를 조작할 때 사용하는 라우터 훅 */
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('searchParams : ', searchParams)
  /** useSearchParams 훅을 이용해 방명과 유저명을 파라미터로 얻어온다. */
  const roomId = searchParams.get("roomId");
  const userId = searchParams.get("userId");

  // 채팅 내역이 보여지는 부분의 DOM 참조
  const chatWindow = useRef();
  // 채팅 데이터 저장용 state
  const [chatData, setChatData] = useState("");

  /** Realtime DB에 대화내역 저장 */
  function messageWrite(chatRoom, chatId, chatMessage) {
    // 고유키 생성 (데이터 저장 시 중복되지 않는 일련번호와 같이 사용됨)
    const newPostKey = push(child(ref(realtime), "tempValue")).key;
    /**
     * ref()
     * 인자가 하나일 때 : 데이터베이스의 루트 경로를 참조
     * 인자가 두개일 때 : 데이터베이스의 특정 경로를 참조
     */
    set(ref(realtime, chatRoom + "/" + newPostKey), {
      // 채팅방은 유저 아이디와 대화 내용으로 구성됨
      id: chatId,
      message: chatMessage,
      date: nowDate(),
    });
    console.log("입력 성공");
  }

  /** Realtime 리스너 정의. 새롭게 입력된 대화내용을 실시간으로 얻어온다. */
  // 채팅 내역이 있는 'room1' node를 통해 참조를 생성
  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    console.log("jey", chatWindow.current);
    // 리스너 생성
    onValue(dbRef, (snapshot) => {
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        console.log("childSnapshot-key : ", childSnapshot.key);
        console.log("childSnapshot-val : ", childSnapshot.val());
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log("리스너", childKey, childData.id, userId);

        // 대화 내용은 종류에 따라 좌/우측 정렬한다.
        if (childData.id === userId) {
          // 내가 보낸 메시지라면 우측 정렬
          showDiv.push(
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                  {childData.message}
                </p>
              </div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                alt="avatar 1"
                style={{ width: "50px", height: "50px" }}
              ></img>
              <span>{childData.date}</span>
            </div>
          );
        }
        // 상대방이 보낸 메시지는 좌측 정렬
        else {
          showDiv.push(
            <div className="d-flex flex-row justify-content-start">
              {childData.id}
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                alt="avatar 1"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <p
                  className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary"
                  style={{ textAlign: "right" }}
                >
                  {childData.message}
                </p>
              </div>
              <span>{childData.date}</span>
            </div>
          );
        }
      });
      setChatData(showDiv);
      // 스크롤바를 최하단으로 내려준다.
      setTimeout(() => {
        scrollTop(chatWindow.current);
      }, 100);
    });
  }, []);

  return (
    <>
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Realtime 채팅</h5>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-sm"
                    data-mdb-ripple-color="dark"
                    id="closeBtn"
                    onClick={() => {
                      window.self.close();
                    }}
                  >
                    채팅종료{" "}
                  </button>
                </div>
                <div className="divider d-flex align-items-center mb-4">
                  <p
                    className="text-center mx-3 mb-0"
                    style={{ color: "#a2aab7;" }}
                  >
                    Today
                  </p>
                </div>

                {/* 채팅 내역이 출력되는 부분. ref를 사용하고 있다. */}
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar-init
                  style={{
                    position: "relative",
                    height: "400px",
                    overflow: "auto",
                  }}
                  id="chatWindow"
                  ref={chatWindow}
                >
                  {chatData}
                </div>

                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 3"
                    style={{ width: "40px", height: "50%;" }}
                  />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      let chatRoom = e.target.chatRoom.value;
                      let chatId = e.target.chatId.value;

                      if (chatId === "") {
                        alert("대화명을 입력하세요");
                        return;
                      }
                      let message = e.target.message.value;
                      if (message == "") {
                        alert("메시지를 입력하세요");
                        return;
                      }
                      console.log("submit", chatRoom, chatId, message);
                      // 입력한 폼값을 정리해서 Realtime에 입력
                      messageWrite(chatRoom, chatId, message);

                      e.target.message.value = "";
                    }}
                  >
                    <input type="hidden" name="chatRoom" value={roomId} />
                    <input type="hidden" name="chatId" value={userId} />
                    <div className="form-group">
                      <input
                        type="text"
                        name="message"
                        className="form-control form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="메시지를 입력하세요"
                      />
                      <button className="hs-3" type="submit">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatMessage;
