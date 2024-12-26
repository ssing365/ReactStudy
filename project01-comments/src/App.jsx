import './App.css';
import {useState} from 'react';

import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';
  
// 현재 날짜
const nowDate = () => {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ("0" + (1+ dateObj.getMonth())).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {
  // 시퀀스용 state
  const [nextNo, setNextNo] = useState(4)

  // 댓글 출력용 state
  const [myData, setMyData] = useState([
    {no:1, comment:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, comment:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'},
    {no:3, comment:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'},
  ]);

  // 댓글 수정용 state
  const [editWriter, setEditWriter] = useState('');
  const [editComment, setEditComment] = useState('');

  return (
    <>
      <Board />
      <ComList 
        myData={myData} setMyData={setMyData} 
        editWriter={editWriter} setEditWriter={setEditWriter}
        editComment={editComment} setEditComment={setEditComment}
      />
      <ComWrite 
        myData={myData} setMyData={setMyData} 
        nextNo={nextNo} setNextNo={setNextNo}
        nowDate={nowDate}
      />
      <ComEdit 
        editWriter={editWriter} setEditWriter={setEditWriter}
        editComment={editComment} setEditComment={setEditComment} 
      />
    </>
  );
}

export default App;
