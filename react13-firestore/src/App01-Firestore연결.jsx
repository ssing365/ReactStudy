import './App.css'
import { firestore } from './firestoreConfig'

// 새로운 문서를 입력하거나 읽을 때 사용하는 함수 Import
import { doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  // 파이어 스토어 연결 확인
  console.log("firestore", firestore);

  /** 도큐먼트 추가 */ 
  const addMessage = async () => {
    /**
     * 컬렉션 : 테이블과 비슷. Korea로 작성
     * 도큐먼트 : 레코드와 비슷. Seoul로 작성
     * 하위 데이터는 JSON객체 형식으로 작성하면 된다.
     * 테이블처럼 정형화된 것이 아니므로 원하는대로 객체에 정보를 추가할 수 있다. 
     * 도큐먼트 안에 새로운 컬렉션 넣기도 가능, 외래키도 없다고 함
     */
    await setDoc(doc(firestore, "Korea", "Seoul2"),{
      gu : '금천구',
      dong : '가산동',
      hotplace: 'KOSMO',
      time : "17:13"
    });
    console.log("입력 성공")
  }

  /** 도큐먼트 읽기 */ 
  const getMessage = async() => {
    // 입력된 컬렉션과 도큐먼트를 통해 문서의 참조를 가져온다.
    const docRef = doc(firestore, "Korea", "Seoul3");
    // 참조를 통해 도큐먼트를 가져온다.
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log("Document data : ", docSnap.data());
    }
    else {
      console.log("No such document!");
    }
  }

  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>Firebase 연결</h3>
      <input type="button" value="입력" onClick={addMessage} />
      <input type="button" value="읽기" onClick={getMessage} />  
    </>
  )
}

export default App
