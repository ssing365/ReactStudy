import "./App.css";

/**
 * 이벤트 처리
 * : HTML에서는 이벤트리스너(핸들러)를 작성할 때 대소문자를 구분하지 않지만,
 * 리액트에서는 이벤트명의 첫글자를 대문자로 기술해야한다.(ex : onClick)
 * 
 * 또한 이벤트는 자식 컴포넌트가 부모 컴포넌트로 데이터를 전달하는 용도로도 사용된다.
 */
const MyBody = (props) => { 
  const liTag1 = [], liTag2 = []; 

  for(let i=0; i<props.propData1.length; i++){
    console.log('프론트엔드 데이터', props.propData1[i]);
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }

  let keyCnt = 0;
  for(let row of props.propData2){
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }

  return (
    <>
      <ol>
        {/** 첫 번째 함수의 경고창은 고정된 메시지를 알림창으로 띄워준다.
         * props로 전달된 기능을 자식 컴포넌트에서 그대로 사용하는 형식이다.
         */}
        <li><a href="/" onClick={()=>{
          props.onMyAlert1();
          }}>프론트엔드</a></li>
          <ul>
            {liTag1}
          </ul>

        {/**
         * 이벤트 객체를 통해 화면이 새로고침되지 않도록 요청을 차단한다.(event.preventDefault())
         * 리액트는 비동기방식으로 화면을 전환하므로 화면이 새로고침되면 안된다.
         * 이런 경우 초기화면으로 전환되기 때문이다.
         */}  
        <li><a href="/" onClick={(event)=>{
          event.preventDefault();
          props.onMyAlert2('백엔드');
        }}>백엔드</a></li>
          <ul>
            {liTag2}  
          </ul>
      </ol>
    </>
  );
};

function App() {
  const myData1 = ['HTML5', 'CSS3', 'JavaScript', 'JQuery', "AAA", 'BBB'];
  const myData2 = ['Java', 'Oracle', 'JSP', 'Spring Boot', 'CCC'];

  return (
    <div className="App">
      <h2>React - Props 전달하기</h2>
      <MyBody propData1={myData1} propData2={myData2} 
        // props로 매개변수가 없는 함수 전달
        onMyAlert1={function(){
          alert("알림창을 띄웁니다.");
        }}
        // props로 매개변수가 있는 함수 전달
        onMyAlert2={function(msg){
          alert(msg); // 자식 쪽에서 전달한 데이터가 부모 쪽에서 사용된다.
        }}
      />
    </div>
  );
};

export default App;
