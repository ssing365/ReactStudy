import { useEffect, useState } from 'react';
import './App.css';

// 목록을 출력하는 컴포넌트
const GlobalTop = (props) => {
  console.log("#Life", "GlobalTop ==> 1.컴포넌트실행");
  // 빈 배열로 state 선언
  const [myList, setMyList] = useState([]);

  // return문이 실행된 후, 즉 렌더링이 완료된 후 실행되는 훅
  useEffect(()=>{
    console.log("#Life", "LifeGood ==> 3.useEffect실행1");
    // 컴포넌트 렌더링이 완료된 후 내부의 json파일을 get방식으로 요청
    fetch('./json/myData.json').then((result)=>{
      /** 요청 성공 시 json파일의 데이터가 매개변수(result)로 콜백된다. */
      // 콜백데이터는 text형식이므로 json포맷으로 변환 후 반환한다.
      console.log('결과1',result);
      return result.json(); 
    }).then((json)=>{
      /** 첫 번째 then절에서 반환한 값은 두 번째 then절로 반환한다.  */
      // 값을 받아 state변경
      console.log('결과2',json);
      setMyList(json);
    });
    return()=>{
      /**
       * 컴포넌트가 언마운트될 때 실행할 코드가 있다면 이 부분에 기술.
       */
      console.log("#Life", "LifeGood ==> 4.useEffect실행2");
    }
  },[]); 
  /** 
   * 의존성배열이 빈 배열 : 페이지가 렌더링되어도 최초 한 번만 실행
   * 의존성배열을 생략하면 무한 로딩하게 됨
   */ 

  const listTag = [];
  // state변수의 크기만큼 반복. 최초 실행 시에는 빈 배열이므로 실행되지 않는다.
  for(let i=0; i<myList.length; i++){
    // 각 루프에 해당하는 객체 인출
    let data = myList[i];
    console.log("데이터", data.id, data.num);
    listTag.push(
      <li key={data.id}>
        {/* data-id 속성에 설정된 값은 event객체 target속성하위의 dataset.id로 얻어올 수 있다.
            이 부분에 게시물의 일련번호인 num을 설정하고 있다. */}
        <a href={data.id} data-id={data.num} onClick={(e)=>{
          e.preventDefault();
          console.log("이벤트객체", e);
          // 여기서 게시물의 일련번호를 부모컴포넌트에 전달한다.
          props.myLinkClick(e.target.dataset.id);
        }}>{data.id}</a>
      </li>
    )
  }

  // UI렌더링
  console.log("#Life", "LifeGood ==> 2.return실행(render와 동일)");
  return(
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  );
}

// props로 전달된 객체의 값을 화면에 출력하는 컴포넌트
const ContentBody = (props) => {
  return(
    <>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num : {props.myResult.num}</li>
        <li>id : {props.myResult.id}</li>
        <li>cell : {props.myResult.cell}</li>
        <li>description : {props.myResult.description}</li>
      </ul>
    </>
  )
}

function App() {   
  // dto.json의 내용을 저장할 state이므로 초깃값은 빈 객체로 설정
  const [myResult, setMyResult] = useState({});

  return (<>
    <h2>React - 내부서버통신</h2>   
     {/* 클릭 시 내부에 저장된 dto.json 파일을 get방식으로 요청 후 
     콜백 데이터를 받아오는 기능의 함수를 props로 전달
     자식 컴포넌트는 이 함수를 호출받으면 여기로 게시물의 일련번호 전달  */}
    <GlobalTop myLinkClick={(num)=>{
      console.log("클릭", num);
      fetch('./json/dto'+num+'.json')
        .then((result)=>{
          console.log("결과1",result);
          return result.json();
        })
        .then((json)=>{
          console.log("결과2",json);
          setMyResult(json);
        });
    }}></GlobalTop>
    <ContentBody myResult={myResult} />
  </>);
}

export default App;