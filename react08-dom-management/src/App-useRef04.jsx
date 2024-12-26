import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  // useRef를 통해 상수 생성
  const inputRef = useRef();

  // 화면의 렌더링이 완료된 후 입력상자로 포커스 이동
  useEffect(()=> {
    console.log(inputRef);
    inputRef.current.focus();
  }, []);

  const login = () => {
    // <input>의 DOM에 접근해서 value를 얻어온다
    alert(`환영합니다. ${inputRef.current.value}`);
    inputRef.current.value = ''; // 빈 값 할당
    inputRef.current.focus(); // 포커스 이동
  }

  return (
    <>
      {/* 앞에서 생성한 useRef를 <input>의 속성으로 추가  */}
      <input type="text" placeholder='아이디' ref={inputRef}/>
      <button onClick={login}>로그인</button>
    </>
  );
}

export default App;
