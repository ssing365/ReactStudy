import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit(props) {
  // 중첩 라우터를 처리하기 위해 useParams 훅 사용
  let params = useParams();
  console.log("수정idx",params.idx);

  /** 수정 전 내용 출력을 위한 ViewAPI 호출 */
  // let [boardData, setBoardData] = useState({});
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx="+params.idx;

  const [writer, setWriter] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  
  const navigate = useNavigate();

  // ViewAPI 요청
  useEffect(()=>{
    fetch(requestUrl+"?"+parameter)
    .then((result)=>{
      return result.json()
    }).then((json)=>{
      console.log('내용출력',json);
      //setBoardData(json);
      setWriter(json.name);
      setSubject(json.subject);
      setContent(json.content);
    });
    return ()=>{
      console.log("useEffect실행 -> 컴포넌트 언마운트");
    }
  },[])

  return (
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // 폼값 얻기
            let w = event.target.writer.value;
            let t = event.target.title.value;
            let c = event.target.contents.value;
            console.log(w, t, c);

            let i = event.target.idx.value;

            /**
             * 글 작성을 위해 POST 전송방식 사용
             * fetch()함수의 첫 번째 인자는 요청URL, 두 번째 인자는 전송방식 및 헤더, 폼값
             */
            fetch("http://nakja.co.kr/APIs/php7/boardEditJSON.php", {
              method: "POST",
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
              /**
               * 작성자가 입력한 폼값을 JSON형식으로 조립하여 전송
               * URLSearchParams 객체는 JSON형식의 데이터를 쿼리스트링 형식으로 변환해주는 역할
               */
              body: new URLSearchParams({
                /**
                 * 이렇게 해도 되고 param.idx로 바로 해도됨. 
                 * 챗지피티한테 물어보니 장단이 있었다.
                 * */
                idx: i, 
                tname: "nboard_news",
                name: w,
                subject: t,
                content: c,
              }),
            })
            .then((response) => response.json())
            .then((json) => console.log(json));

            // 수정 완료되면 view페이지 이동
            navigate("/view/"+params.idx);
          }}
        >
          <input type="hidden" name="idx" value={params.idx}/>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="writer" value={writer}
                    onChange={(event)=>{
                      setWriter(event.target.value)
                    }} />
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input type="text" name="title" value={subject}
                    onChange={(event)=>{
                      setSubject(event.target.value)
                    }} />
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <textarea name="contents" id="" cols="22" rows="3" value={content}
                  onChange={(event)=>{
                    setContent(event.target.value)
                  }}></textarea>
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

export default Edit;
