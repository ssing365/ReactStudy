import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatStart from "./components/ChatStart";
import ChatMessage from "./components/ChatMessage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatStart/>} />
        <Route path="talk" element={<ChatMessage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App