// 컴포넌트 모듈화를 위해 제일 먼저 필요한 React Import
import React from "react";

// 함수형 컴포넌트 생성. 파일명과 동일한 이름으로 생성한다.
function ListComponent(props) {
  /**
   * 컴포넌트에서 실제 표현해야 하는 UI를 return문 내부에 기술한다.
   * 기존 클래스형 컴포넌트에서는 render()함수가 있었는데 함수형에서는 return이 역할을 대신한다.
   */
  return (
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        <a href="/" onClick={(event)=>{
          event.preventDefault();
          props.changeMode('write');
        }}>글쓰기</a>
      </nav>
      <article>
        <table>
          <thead>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </thead>
          <tbody>
            <tr>
              <td className="cen">1</td>
              <td>
                {/** 부모에서 전달된 Props를 아래와 같이 호출해서 mode를 view로 변경 */}
                <a href="/" onClick={(event) => {
                event.preventDefault();
                props.changeMode('view');
              }}>오늘은 React공부하는 날</a></td>
              <td className="cen">낙짜쌤</td>
              <td className="cen">2030-05-05</td>
            </tr>
          </tbody>
        </table>
      </article>
      <hr></hr>
    </>
  );
}

/**
 * 외부파일에서 해당 컴포넌트를 import하려면 export default로 먼저 내보내기 해야한다.
 */
export default ListComponent;
