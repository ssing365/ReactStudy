import RealtimeCRUD from "./components/RealtimeCRUD";
import Listener from "./components/Listener";
import ChatStart from "./components/ChatStart";
import ChatMessage from "./components/ChatMessage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // 라우터 처리를 위해 전체 컴포넌트 래핑
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RealtimeCRUD />} />
        <Route path="/crud" element={<RealtimeCRUD />} />
        <Route path="/listener" element={<Listener />} />
        <Route path="/chat">
          <Route index element={<ChatStart />}></Route>
          <Route path="talk" element={<ChatMessage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;