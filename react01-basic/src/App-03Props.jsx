import "./App.css";

/**
 * props(프롭스)
 * : React에서 상태를 저장하기 위한 값으로 부모 컴포넌트가 자식 컴포넌트로 전달하는 읽기 전용 데이터
 * 전달시에는 HTML의 속성처럼 기술한다.
 * 형식]
 *  <컴포넌트 props속성명={전달할 값}/>
 *  => 이렇게 전달하면 해당 컴포넌트에서는 "props.속성명"과 같이 사용할 수 있다.
 */

/**
 * App컴포넌트에서 2개의 Props를 전달하고 있으므로 매개변수 props로 한꺼번에 받은 후 사용 가능
 */
const MyBody = (props) => { 
  const liTag1 = [], liTag2 = []; // 빈 배열 생성

  // propData1로 전달된 데이터는 일반 for문으로 반복
  for(let i=0; i<props.propData1.length; i++){
    console.log(props.propData1[i]);
    // 각 루프에서 liTag1 배열에 항목을 하나씩 추가한다.
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }

  // propData2로 전달된 데이터는 for~of문으로 반복 삽입
  let keyCnt = 0;
  for(let row of props.propData2){
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }
  /**
   * React에서는 게시판의 목록과 같이 반복적으로 출력되는 항목에
   * key라는 unique한 prop을 쓰도록 권고한다.
   * 위와 같은 상황에서 배열의 인덱스나 중복되지 않는 일련번호 등을 부여해야한다.
   * 그렇지 않으면 warning이 발생한다.
   */

  // 앞에서 생성한 배열변수를 렌더링하기 위해 return문장에 변수형태로 삽입
  return (
    <>
    number타입의 props : {props.a}
      <ol>
        <li>프론트엔드</li>
          <ul>
            {liTag1}
          </ul>
        <li>백엔드</li>
          <ul>
            {liTag2}  
          </ul>
      </ol>
    </>
  );
};

function App() {
  // props로 사용할 배열
  const myData1 = ['HTML5', 'CSS3', 'JavaScript', 'JQuery', "AAA", 'BBB'];
  const myData2 = ['Java', 'Oracle', 'JSP', 'Spring Boot', 'CCC'];

  return (
    <div className="App">
      <h2>React - Props 전달하기</h2>
      {/** MyBody 컴포넌트로 2개의 props 전달. 
       * 전달 시에는 HTML의 속성과 같이 기술한다.
       * 변수가 아닌 문자열을 전달할 때는 propData1="string"과 같이 더블 쿼테이션 사용,
       * 변수, 함수, 숫자는 중괄호 사용
       */}
      <MyBody propData1={myData1} propData2={myData2} a={312} />
    </div>
  );
};

export default App;
