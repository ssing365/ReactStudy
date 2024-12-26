import React from "react";
import { Link } from "react-router-dom";

function Write(props) {
  // 받은 props를 모두 변수에 저장
  const boardData = props.myData;
  const setBoardData = props.setMyData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const nowDate = props.nowDate;

  return (
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form onSubmit={
          (event)=>{
            // submit 이벤트 차단
            event.preventDefault();

            // 이벤트 객체의 target으로 DOM에 입력된 내용을 얻어옴
            let w = event.target.writer.value;
            let t = event.target.title.value;
            let c = event.target.contents.value;

            // 추가할 객체 생성
            let addBoardData = {no:nextNo, writer:w, title:t, contents:c, date:nowDate()};

            /** 추가 */
            // 복사본 생성 후 데이터 추가
            let copyBoardData = [...boardData];
            copyBoardData.push(addBoardData);
            // state 업데이트
            setBoardData(copyBoardData);
            // 시퀀스 번호 업데이트
            setNextNo(nextNo+1);
          }
        }>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="writer" />
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input type="text" name="title" />
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <textarea name="contents" id="" cols="22" rows="3"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송" />
        </form>
      </article>
    </>
  );
}

export default Write;