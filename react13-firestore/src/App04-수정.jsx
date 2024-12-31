import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import "./App.css";
import { firestore } from "./firestoreConfig";
import { useEffect, useState } from "react";

function App() {
  // console.log("firestore", firestore);

  const nowDate = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    let day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  };

  /** 도큐먼트 수정 함수 */
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    // 기존 입력 함수와 완전히 동일. 즉 데이터가 있으면 수정 처리된다.
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("수정성공");
  };

  // <select>태그에 내용을 추가하기 위한 state
  const [showData, setShowData] = useState([]);

  // 화면의 렌더링이 끝난 후 실행되는 수명주기 함수(훅)
  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];
      // members 컬렉션 하위의 도큐먼트를 얻어온다.
      const querySnapshot = await getDocs(collection(firestore, "members"));
      // 개수만큼 반복해서 <option>태그 생성
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        let memberInfo = doc.data();
        // console.log('파싱', doc.id, memberInfo.pass, memberInfo.name, memberInfo.regdate)
        trArray.push(
          // value는 회원의 아이디, text는 이름을 설정
          <option key={doc.id} value={doc.id}>
            {memberInfo.name}
          </option>
        );
      });
      return trArray;
    };

    // 함수 호출 후 콜백된 데이터를 then절에서 처리
    getCollection().then((result) => {
      console.log("result", result);
      // state를 변경해서 <select>에 <option>을 추가한다.
      setShowData(result);
    });
  }, []); 
  /**
   * useEffect()의 두 번째 인자인 의존성배열은 빈 값을 적용하여 
   * 딱 한 번만 호출되도록 처리한다.
   **/

  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 수정하기</h3>
      {/* 항목 하나를 선택하면 change 이벤트 발생됨 */}
      <select
        onChange={async (e) => {
          // 선택 항목의 value 즉 id를 얻어온다.
          let user_id = e.target.value;
          console.log("선택", user_id);

          // 컬렉션 명과 아이디(도큐먼트 명)를 통해 데이터의 참조를 얻어온다.
          const docRef = doc(firestore, "members", user_id);
          // 참조값을 통해 해당 도큐먼트를 얻어온다.
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // 해당 문서가 존재하면 데이터를 인출한 후
            console.log("Document data:", docSnap.data());
            let callData = docSnap.data();
            // 각 state를 변경하여 <input>에 값을 추가한다.
            setId(user_id);
            setPass(callData.pass);
            setName(callData.name);
          } else {
            console.log("No such document!");
          }
        }}
      >
        <option>선택하세요</option>
        {showData}
      </select>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          let collection = event.target.collection.value;
          let id = event.target.id.value;
          let pass = event.target.pass.value;
          let name = event.target.name.value;

          if (id == "") {
            alert("사용자를 먼저 선택해주세요");
            return;
          }

          memberEdit(collection, id, pass, name);

          event.target.id.value = "";
          event.target.pass.value = "";
          event.target.name.value = "";
        }}
      >
        <table className="table table-bordered table-striped">
          <tr>
            <td>컬렉션(테이블)</td>
            <td>
              <input type="text" name="collection" value="members" />
            </td>
          </tr>
          <tr>
            <td>아이디(변경불가)</td>
            <td>
              <input
                type="text" name="id" value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input
                type="text" name="pass" value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input
                type="text" name="name" value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </td>
          </tr>
        </table>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
export default App;
