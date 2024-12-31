import { doc, setDoc } from "firebase/firestore";
import "./App.css";
import { firestore } from "./firestoreConfig";

function App() {
  console.log("firestore", firestore);

  const nowDate = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    let day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  };

  // Firestore에 내용 입력
  const memberWrite = async (p_collection, p_id, p_pass, p_name) => {
    // doc()으로 컬렉션과 도큐먼트 생성 후 setDoc()으로 내용 입력
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("입력성공");
  };

  return (
    <div>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>입력하기</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          let collection = event.target.collection.value;
          let id = event.target.id.value;
          let pass = event.target.pass.value;
          let name = event.target.name.value;

          if (id == "") {
            alert("아이디를 입력하세요");
            return;
          }
          if (pass == "") {
            alert("비번을 입력하세요");
            return;
          }
          if (name == "") {
            alert("이름을 입력하세요");
            return;
          }

          memberWrite(collection, id, pass, name);

          id = event.target.id.value = "";
          pass = event.target.pass.value = "";
          name = event.target.name.value = "";
        }}
      >
        {/* Bootstap 스타일이 적용된 테이블 */}
        <table className="table table-bordered table-striped">
          <tr>
            <td>컬렉션(테이블)</td>
            <td>
              <input type="text" name="collection" value="members" />
            </td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>
              <input type="text" name="id" />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="text" name="pass" />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input type="text" name="name" />
            </td>
          </tr>
        </table>
        <button type="submit">입력</button>
      </form>
    </div>
  );
}
export default App;