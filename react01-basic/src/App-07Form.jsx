import { useState } from "react";
import "./App.css";

function WriteForm(props){
  return(
    /** submit 이벤트 리스너를 통해 폼값 처리 */
    <form onSubmit={(e)=>{
      // 이벤트 리스너에서는 event 객체를 매개변수로 받을 수 있다.
      e.preventDefault(); // submit 이벤트 차단
      console.log(e)
      let writer = e.target.writer.value; // 이벤트의 target속성을 통해 입력한 폼값을 얻어온다.
      let title = e.target.title.value;
      let contents = e.target.contents.value;
      // 컴포넌트에서 props로 전달해준 함수를 호출하여 폼값을 전달한다.
      props.writeAction(title,writer, contents);
    }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer"/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title"/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" id="" cols='22' rows='3'></textarea></td>
          </tr>
          
        </tbody>
      </table>
    <input type="submit" value="전송"/>
    </form>
  )

}

function App() {
  // message라는 state 생성
  const [message, setMessage] = useState('폼값 검증 진행중');
  return(
    <>
      <h2>React - 폼값 처리</h2>
      {/** 작성폼 컴포넌트를 추가하면서 props를 통해 폼값을 받아 콘솔에 출력하는 함수를 전달한다.
       * 3가지 모두 빈값이 아니라면 state를 완료로 변경한다.
       */}
      <WriteForm writeAction={(wr, ti, con) => {
        console.log("Form값", wr, ti, con);
        // 폼값 검증이 완료되면 state를 변경한다.
        if(wr!=='' && ti!=='' && con!==''){
          setMessage("폼값 검증 완료")
        }
      }}></WriteForm>
      {/** state가 변경되면 새롭게 렌더링이 되므로 아래 텍스트가 변경되는 것을 볼 수 있다. */}
      <p>{message}</p>
    </>
  )
}

export default App;
