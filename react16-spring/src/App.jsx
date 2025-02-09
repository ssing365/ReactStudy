import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import.meta.env.PUBLIC_URL
import MyList from "./components/MyList";
import MyView from "./components/MyView";
import MyWrite from "./components/MyWrite";

const TopNavi = () =>{
  return(
    <nav>
      <table border="1" width="90%">
        <tr>
          <td style={{textAlign:'center'}}>
            <a href="/">Main</a>
            <a href="/crud/index.html">React CRUD</a>
            <a href="/boardList.do">Spring Board</a>
            <a href="/rboard/index.html">React Board</a>
          </td>
        </tr>

      </table>
    </nav>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <TopNavi />
        <Routes>
          <Route path='' element={<MyList />} />
          <Route path='/list' element={<MyList />} />
          <Route path='/view'>
            <Route path=":num" element={<MyView />} />
          </Route>
          <Route path='/write' element={<MyWrite />} />
        </Routes>
      </div>
      
    </HashRouter>
  )
}

export default App;
