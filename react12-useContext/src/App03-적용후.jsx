import { useState } from "react";
import "./App.css";

import { ThemeContext } from "./context/ThemeContext";

import Page from "./components/Page";
import { SimpleContext } from "./context/SimpleContext";

function App() {
  const [isDark, setIsDark] = useState(false);

  // 데이터 공유를 위한 Provider는 2개 이상 겹쳐서 랩핑할 수 있다.
  return (
    /** SimpleContext를 주석 처리하면 모듈에서 초기화한 값이 출력되고,
     * 활성화하면 value속성으로 부여한 값이 출력된다.
     * 즉 Provider로 랩핑하여 value로 적용한 값이 우선순위가 높다.
     */
    // <SimpleContext.Provider value={"Welcome 헝딜동"}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <>
          <Page />
        </>
      </ThemeContext.Provider>
    // </SimpleContext.Provider>
  );
}

export default App;
