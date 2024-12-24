import "./App.css";
import { Routes, Route} from "react-router-dom";

// 모듈화 처리한 컴포넌트 임포트
import List from './components/board/List'
import Write from './components/board/Write'
import View from './components/board/View'
import Edit from './components/board/Edit'
import NotFound from './components/common/NotFound'

function App() {
  return (
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/view" element={<View />}>
          <Route path=":idx" element={<View/>}/>
        </Route>
        <Route path="/write" element={<Write />} />
        <Route path="/edit">
          <Route path=":idx" element={<Edit />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;