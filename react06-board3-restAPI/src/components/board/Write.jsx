import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Write(props) {
  // 페이지 이동을 위한 Hook
  const navigate = useNavigate();
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
            event.preventDefault();
            // 폼값 얻기
            let w = event.target.writer.value;
            let t = event.target.title.value;
            let c = event.target.contents.value;
            console.log(w, t, c)

            /**
             * 글 작성을 위해 POST 전송방식 사용
             * fetch()함수의 첫 번째 인자는 요청URL, 두 번째 인자는 전송방식 및 헤더, 폼값
             */
            fetch('http://nakja.co.kr/APIs/php7/boardWriteJSON.php',{
              method:'POST',
              headers : {
                'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
              },
              /**
               * 작성자가 입력한 폼값을 JSON형식으로 조립하여 전송
               * URLSearchParams 객체는 JSON형식의 데이터를 쿼리스트링 형식으로 변환해주는 역할
               */
              body:new URLSearchParams({
                tname : 'nboard_news',
                id:'jsonAPI',
                name:w,
                subject:t,
                content:c,
              }),
            })
            .then((response)=>response.json())
            .then((json)=>console.log(json));

            // 글쓰기 완료되면 목록으로 이동
            navigate('/list');
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