import { useEffect, useState } from 'react';
import './App.css';

function MyCommunication(props){
  /** 외부 서버의 API를 얻어오기 위해 state생성
   * 초깃값은 JSON포맷에 따라 달라질 수 있으므로 확인 후 설정한다.
   */
  const [myJSON, setMyJSON] = useState({results:[]});

  // 해당 UI의 렌더링이 끝난 후 API의 정보를 얻어온다.
  useEffect(()=>{
    // API서버에서 10명의 정보를 JSON으로 콜백받는다.
    fetch("https://api.randomuser.me?results=10")
    .then((result)=>{
      console.log(result)
      return result.json()
    }).then((json)=>{
      console.log(json)
      // 콜백데이터를 통해 state를 변경한다.
      setMyJSON(json);
    });
    return () => {
      console.log("#Life", "useEffect실행 => 컴포넌트 언마운트");
    }
  },[]);

  let trTag = [];
  // 결과데이터 개수만큼 tr태그 생성
  for(let i=0; i<myJSON.results.length; i++){
    let data = myJSON.results[i];
    console.log(data);
    trTag.push(
      <tr key={data.login.md5}>
        <td><img src={data.picture.large} alt='{data.login.username}' /></td>
        <td><a href="/" onClick={(e)=>{
          e.preventDefault();
          /** 아이디를 클릭하면 props로 전달된 함수를 통해
           * 현재 루프의 객체를 그대로 전달
           */
          props.onProfile(data);
        }}>{data.login.username}</a>
        </td>
        <td>{data.name.title} {data.name.first} {data.name.last}</td>
        <td>{data.nat}</td>
        <td>{data.email}</td>
      </tr>
    );
  }
  return(
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>국가</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {trTag}
        </tbody>
      </table>
    </div>
  )
}

function App() {   
  return (<>
      <h2>React-외부서버통신</h2>
      {/* 링크를 클릭하면 정보를 파싱한 문자열을 alert으로 출력 */}
      <MyCommunication onProfile={(sData)=>{
        console.log(sData);
        // 백틱과 ${}를 이용해 정보출력
        let info = 
        `전화번호:${sData.cell}
        성별:${sData.gender}
        username:${sData.login.username}
        password:${sData.login.password}`;
        alert(info);
      }} />
  </>);
}

export default App;