import { storage } from "./storageConfig";
import { deleteObject, listAll, ref } from "firebase/storage";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // 스토리지 연결 및 root경로의 참조 생성
  const listRef = ref(storage, "");
  // 파일 목록 저장을 위한 state
  const [fileLists, setFileLists] = useState([]);
  // 삭제 후 전체 렌더링을 위한 state
  const [renderFlag, setRenderFlag] = useState(false);

  useEffect(() => {
    let fileRows = [];
    // 생성된 참조에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then((res) => {
        console.log("폴더 리스트 : ", res.prefixes);
        // 폴더명 출력
        res.prefixes.forEach((folderRef) => {
          console.log("폴더명 : ", folderRef);
        });
        // 파일명 출력
        res.items.forEach((itemRef) => {
          const deleteRef = ref(storage, itemRef.fullPath);

          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.name}</td>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>
                <button
                  onClick={() => {
                    if (window.confirm("삭제할까요?")) {
                      deleteObject(deleteRef)
                        .then(() => {
                          console.log("파일 삭제 성공");
                          setRenderFlag(!renderFlag);
                        })
                        .catch((e) => {
                          console.log("파일 삭제 실패", e);
                        });
                    }
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          );
        });
        // 완성된 파일목록을 통해 state 변경
        setFileLists(fileRows);
      })
      .catch((error) => {
        console.log("파일 목록 출력중 에러발생"), error;
      });
  }, [renderFlag]);
  // 파일 삭제시 renderFlag가 변경됨

  console.log("렌더링");

  return (
    <>
      <h2>Firebase - Storage App</h2>
      <h3>파일 목록 및 삭제</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>bucket</th>
            <th>fullPath</th>
            <th>name</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>{fileLists}</tbody>
      </table>
    </>
  );
}

export default App;
