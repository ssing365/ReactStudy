import { storage } from './storageConfig';
import { ref, uploadBytes } from 'firebase/storage';
import './App.css'

function App() {
  // 파이어베이스 스토리지 연결 및 확인
  const storageRef = ref(storage);
  console.log("storageRef", storageRef);

  /**
   * ref()를 호출할 때 경로를 두 번째 인수로 전달하여 
   * 경로 트리에서 하위 위치를 가리키는 참조를 만들 수 있다.
   */
  // Ref1 경로 : root/images
  const imagesRef1 = ref(storage, 'images');
  // Ref2 경로 : root/images/myFile.jpg
  const imagesRef2 = ref(storage, 'images/myFile.jpg');

  /** parent 및 root 속성을 사용하여 한 단계 상위로 이동하거나 최상위로 이동할 수 있다  */
  // Ref3 경로 : root/images
  const imagesRef3 = imagesRef2.parent;
  // Ref4 경로 : root. 최상위 경로이므로 콘솔에 아무것도 출력되지 않음.
  const imagesRef4 = imagesRef2.root;
  
  console.log("ref객체", imagesRef1);
  console.log("경로1", imagesRef1.fullPath);
  console.log("경로2", imagesRef2.fullPath, imagesRef2.name);
  console.log("경로3", imagesRef3.fullPath);
  console.log("경로4", imagesRef4.fullPath);

  return (
    <>
    <h2>Firebase - Storage App</h2>
    <h3>스토리지 접속 및 파일 업로드</h3>
    <p>파일을 선택하면 즉시 업로드 됩니다.</p>
    <input type="file" name='myfile' onChange={(e)=>{
      console.log("files프로퍼티", e.target.files);

      /**
       * 파일 업로드
       * const ref변수 = ref(스토리지객체, 파일명);
       * uploadBytes(ref변수, 파일객체).then(성공시 콜백 함수)
       * 
       * storage객체를 변경하면 특정 경로에 업로드 할 수 있다.
       * storage -> imagesRef1로 변경해보자
       */
      const imageRef = ref(imagesRef1, e.target.files[0].name);
      uploadBytes(imageRef, e.target.files[0]).then((snapshot)=>{
        console.log("업로드 성공", snapshot)
      })
    }}/>
    </>
  )
}

export default App