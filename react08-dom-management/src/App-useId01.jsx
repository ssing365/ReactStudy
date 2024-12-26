import { useId } from "react";
import "./App.css";

/**
 * useID()는 고유한 아이디를 생성해준다.
 * DOM에 아이디를 부여하거나 라벨링할 때 편리하다.
 */

function App() {
  const myId = useId();
  console.log("myId", myId);

  return (
    <>
      <MyInput />
    </>
  );
}

function MyInput() {
  // 두 번째 아이디 생성
  const ageId = useId();
  console.log("ageId", ageId);
  return (
    <>
      {/* HTML <label>태그는 체크박스나 라디오와 함께 사용된다.
      label태그의 for 속성과 input 태그의 id속성이 일치하면
      하나의 요소로 라벨링되어 텍스트를 클릭해도 input에 포커싱된다.
      단, for는 JS의 예약어이므로 JSX에서는 htmlFor라고 작성해야한다. 
      */}
      {/* HTML 속성을 사용하여 연결 */}
      <label htmlFor="name">이름</label>
      <input type="text" id="name" />
      <br />
      {/* useID 훅을 사용하여 연결 */}
      <label htmlFor={ageId}>나이</label>
      <input type="text" id={ageId} />
    </>
  );
}
export default App;
