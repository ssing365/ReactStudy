import { useState } from "react";
import "./App.css";
import { firestore } from "./firestoreConfig";
import { collection, getDocs } from 'firebase/firestore';

function App() {
  // 데이터를 저장할 state 정의. 초깃값은 빈 배열
  const [showData, setShowData] = useState([]);

  const getCollection = async () => {
    let trArray = [];
    // 컬렉션 이름으로 지정된 하위 문서를 얻어온다.
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "->", doc.data());
      let memberInfo = doc.data();
      console.log(
        "파싱",
        doc.id,
        memberInfo.pass,
        memberInfo.name,
        memberInfo.regdate
      );
      trArray.push(
        <tr key={doc.id}>
          <td className="cen">{doc.id}</td>
          <td className="cen">{memberInfo.pass}</td>
          <td className="cen">{memberInfo.name}</td>
          <td className="cen">{memberInfo.regdate}</td>
        </tr>
      );
    });
    // 파싱된 데이터를 통해 state변경, 새롭게 렌더링
    setShowData(trArray);
  };
  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>전체조회하기</h3>
      <button onClick={getCollection}>전체조회</button>
      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>아이디</th> <th>비밀번호</th> <th>이름</th> <th>가입일</th>
          </tr>
        </thead>
        <tbody>{showData}</tbody>
      </table>
    </>
  );
}
export default App;
