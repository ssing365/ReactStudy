import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function View(props) {

  // 중첩 라우터를 처리하기 위해 useParams 훅 사용
  let params = useParams();
  console.log(params);

  let [boardData, setBoardData] = useState({});
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx="+params.idx;

  const navigate = useNavigate();

  // API요청
  useEffect(()=>{
    fetch(requestUrl+"?"+parameter)
    .then((result)=>{
      return result.json()
    }).then((json)=>{
      console.log(json);
      setBoardData(json);
    });
    return ()=>{
      console.log("useEffect실행 -> 컴포넌트 언마운트");
    }
  },[])

  return (
    <>
      <header>
        <h2>게시판-읽기</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>&nbsp;
        <Link to={"/edit/"+params.idx}>수정</Link>&nbsp;
        <Link onClick={()=>{
          if(window.confirm("삭제하시겠습니까?")){
            console.log("삭제 idx", params.idx)
            fetch('http://nakja.co.kr/APIs/php7/boardDeleteJSON.php',{
              method:'POST',
              headers:{
                'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
              },
              body: new URLSearchParams({
                tname : 'nboard_news',
                idx: params.idx,
              }),
            })
            .then((result)=>result.json())
            .then((json)=>{
              console.log(json);
              if(json.result==='success'){
                alert("삭제되었습니다.");
                navigate("/list");
              }
              else{
                alert("삭제에 실패했습니다.");
              }
            });
          }
        }}>삭제</Link>
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
              <td>{boardData.name}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{boardData.subject}</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{boardData.regdate}</td>
            </tr>
            <tr>
              <th>내용</th>
              {/* HTML태그가 그대로 출력된다.
              react는 보안문제로 태그를 화면에 그대로 출력하는게 default다. */}
              {/* <td>{boardData.content}</td> */}
              {/* 마크업이 적용된 상태로 출력됨 */}
              <td dangerouslySetInnerHTML={{__html:boardData.content}}></td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default View;