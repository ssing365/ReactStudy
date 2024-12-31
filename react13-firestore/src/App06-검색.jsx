import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import "./App.css";
import { firestore } from "./firestoreConfig";
import { useState } from "react";

function App() {
  // console.log("firestore", firestore);
  const [showData, setShowData] = useState([]);

  // 검색을 위한 함수. 검색필드와 검색어를 매개변수로 정의
  const getCollection = async (sField, sStr) => {
    let getRows = [];

    if (sField === "id") {
      /** 
       * 우리는 아이디를 도큐먼트명으로 사용했기 때문에
       * 아이디를 통한 검색은 도큐먼트를 찾는 것으로 구현
       */
      const docRef = doc(firestore, "members", sStr);
      // 참조값을 통해 도큐먼트를 찾는다.
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data : ", docSnap.data());
        getRows.push(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } else if (sField === "name") {
      /** 
       * 이름으로 검색하는 경우에는 where, query 함수를 사용한다.
       * 먼저 컬렉션을 얻어온다.
       */
      const membersRef = collection(firestore, "members");
      console.log("membersRef", membersRef);
      /** query함수를 통해 where절에 맞는 데이터 검색
       * 여기서는 name컬럼에 일치하는 값이 있는 도큐먼트를 검색한다.
       */
      const q = query(membersRef, where("name", "==", sStr));
      const querySnapshot = await getDocs(q);
      console.log("Document data : ", querySnapshot);
      // 조건에 일치하는 도큐먼트가 2개 이상일 수 있으므로 forEach 사용
      querySnapshot.forEach((doc) => {
        console.log("반복 인출", doc.id, doc.data());
        getRows.push(doc.data());
      });
    }
    let trArray = [];
    console.log("getRows", getRows);
    getRows.forEach((row) => {
      trArray.push(
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.pass}</td>
          <td>{row.name}</td>
          <td>{row.regdate}</td>
        </tr>
      );
    });
    setShowData(trArray);
  };

  return (
    <div>
      <h2>Firebase - Firestore 연동 App</h2>
      <h4>검색하기</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // 폼값을 submit하면 입력값을 받은 후 검색을 위한 함수 호출
          let sf = event.target.searchField.value;
          let ss = event.target.searchStr.value;
          getCollection(sf, ss);
        }}
      >
        <div className="input-group" id="myForm">
          <select name="searchField" className="form-control">
            <option value="id">아이디</option>
            <option value="name">이름</option>
          </select>
          <input type="text" name="searchStr" id="" className="form-control" />
          <button type="submit" className="btn btn-secondary">
            전체조회
          </button>
        </div>
      </form>
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="table table-bordered">
            <th>아이디</th>
            <th>비번</th>
            <th>이름</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>{showData}</tbody>
      </table>
    </div>
  );
}
export default App;
