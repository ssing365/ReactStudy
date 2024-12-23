import React from "react";
import { Link, useParams } from "react-router-dom";

function View(props) {
  /**
   * useParams
   *  : 컴포넌트를 라우터 처리할 때 중첩된 구조내에서 :no와 같이 사용된
   * 파라미터의 값을 얻어올 수 있는 Hook
   */
  let params = useParams();
  console.log("파라미터", params.no);
  console.dir('파라미터 구조', params);

  /**
   * 데이터 배열의 크기만큼 반복하여 조건에 맞는 객체를 찾은 후 반환한다.
   * 빈 객체를 초깃값으로 사용했으므로, 배열의 크기인 N만큼 반복하게 된다.
   */
  let vi = props.boardData.reduce((prev, curr) => {
    if(curr.no === Number(params.no)){
      prev = curr;
    }
    return prev;
  }, {});
  console.dir('선택된 객체 구조', vi);

  return (
    <>
      <header>
        <h2>게시판-읽기</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>&nbsp;
        <Link to="/edit">수정</Link>&nbsp;
        <Link to="/delete">삭제</Link>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="30%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{vi.writer}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{vi.title}</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{vi.date}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{vi.contents}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default View;