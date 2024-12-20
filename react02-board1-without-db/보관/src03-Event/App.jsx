import "./App.css";

function Header({title}) {
    console.log('props', title);
    return (
      <header>
        <h2>{title}</h2>
      </header>
    );
  }

function Nav(props) {
  return (
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}
function Article({boardData, onChangeMode}) {
  const lists = [];
  // props로 전달된 객체형 배열의 크기만큼 반복
  for(let i=0; i<boardData.length; i++){
    // 각 루프에 해당하는 객체를 꺼낸 후 lists에 추가
    let row = boardData[i];
    lists.push(
      // 게시물의 일련번호로 key props 생성
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        {/** 제목 클릭하면 열람으로 전환. 'read/번호'형식으로 링크 설정 */}
        <td><a href={'/read/'+row.no} onClick={(event) => {
              event.preventDefault();
              //각 게시물의 일련번호를 전달
              onChangeMode(row.no);
            }}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    )
  }
  return (
    <article>
      <table id="boardTable">
        <thead>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </thead>
        <tbody>
            {/** 배열에 추가한 데이터를 여기서 출력 */}
            {lists}
        </tbody>
      </table>
    </article>
  );
}

function App() {
  // 게시판의 데이터로 사용할 객체형 배열
  const boardData = [
    {no:1, title:'오늘은 React공부하는 날', writer:"낙자쌤", date:'2023-01-01', contents:'React를 뽀개봅시다'},
    {no:2, title:'어제는 JS공부해씸', writer:"유겸이", date:'2023-03-03', contents:'JavaScript는 할게 너무 많아요'},
    {no:3, title:'내일 Project할건데', writer:"개똥이", date:'2023-05-05', contents:'Project는 뭘 할까?'}
  ];

  return (
    <>
      {/** 문자열 props 전달 */}
      <Header title="게시판-목록(props)"/>
      <Nav onChangeMode={function(){
        alert("글쓰기 페이지로 이동")
      }}/>
      {/** 변수 props 전달 */}
      <Article boardData={boardData} onChangeMode={(no)=>{
        alert("선택한 게시물 번호 : "+no);
      }}/>
    </>
  );
}

export default App;
