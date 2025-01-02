import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [myData, setMyData] = useState([]);
  const [albumId, setAlbumId] = useState();
  const [Id, setId] = useState();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums/50/photos")
      .then((response) => response.json())
      .then((json) => {
        setMyData(json);
        console.log(json)
      });
    return ()=>{
      console.log('useEffect()실행')
    }
  }, []);

  const trTag = [];
  myData.forEach((data) => {
    trTag.push(
      <>
        <tr key={data.id}>
          <td>
            <img src={data.thumbnailUrl} alt={data.title} />
          </td>
          <td>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setAlbumId(data.albumId)
                setId(data.id);
                setTitle(data.title);
                setUrl(data.url);
                setThumbnailUrl(data.thumbnailUrl);
              }}
            >
              {data.title}
            </a>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <h2>연락처 API 연동하기</h2>
      <div className="main-container">
        {/* 왼쪽 테이블 영역 */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody key={1}>{trTag}</tbody>
          </table>
        </div>

        {/* 오른쪽 상세 정보 영역 */}
        <div className="detail-container">
          <ul>
            <li>
              <strong>Album ID:</strong> <span>{albumId}</span>
            </li>
            <li>
              <strong>ID:</strong> <span>{Id}</span>
            </li>
            <li>
              <strong>Title:</strong> <span>{title}</span>
            </li>
            <li>
              <strong>URL:</strong>{" "}
              <a href={url} target="blank">{url}</a>
            </li>
            <li>
              <strong>Thumbnail URL: </strong>
              <a href={thumbnailUrl} target="blank" >{thumbnailUrl}</a> {" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
