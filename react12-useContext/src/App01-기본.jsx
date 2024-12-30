import "./App.css";
import { useState } from "react";

// 컴포넌트 임포트
import CompState1 from "./commons/CompProps1";
import CompContext1a from "./commons/CompContext1a";
import CompContext1b from "./commons/CompContext1b";
// 컨텍스트 임포트
import { SimpleContext } from "./context/SimpleContext";

function App() {
  const [myNumber, setMyNumber] = useState(1);
  return (
    <>
      <h2>최상위 컴포넌트</h2>
      {/* state로 선언한 myNumber의 값을 변경하기 위한 input */}
      <input
        type="number" value={myNumber} onChange={(e) => {
          setMyNumber(e.target.value);
        }}
      />

      <>
        <h3>Props를 통한 데이터 전달</h3>
        {/* 문자열과 state를 props로 전달 */}
        <CompState1 propData={"props로 전달되는 데이터"} myNumber={myNumber} />
      </>

      {/* 하위 컴포넌트로 전달하는 props없이 삽입 */}
      <>
        <h3>useContext 적용</h3>
        <CompContext1a />
      </>

      {/* Context Provider를 이용해 하위 컴포넌트를 랩핑한다.
          그러면 하위 컴포넌트는 Provider가 제공하는 데이터를 공유할 수 있다. */}
      <SimpleContext.Provider value={{str:'Provider의 초깃값', num:myNumber}}>
        <div>
          <h3>useContext 적용 및 Provider 래핑</h3>
          <CompContext1b />
        </div>
      </SimpleContext.Provider>
    </>
  );
}

export default App;
