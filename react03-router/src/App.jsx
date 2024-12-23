/**
 * react-router-dom으로부터 Import한 컴포넌트와 훅
 */
import { Link, NavLink, Outlet, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import './App.css'

/**
 * NavLink컴포넌트는 <a>태그와 같이 하이퍼링크를 제공한다.
 * 단 <a>태그에서 preventDefault()가 적용된 형태로, 새로고침 없이 페이지 이동이 가능하다.
 * 또한 active라는 클래스 속성을 자동으로 추가해준다.
 */
const TopNavi = () => {
  return(
    <nav>
      <NavLink to='/'>Home</NavLink>&nbsp;
      <NavLink to='/intro'>Intro</NavLink>&nbsp;
      <NavLink to='/intro/router'>Router 관련 Hook</NavLink>&nbsp;
      <NavLink to='xyz'>잘못된 URL</NavLink>&nbsp;
      
      {/* a태그는 페이지가 새로고침된다 */}
      <a href="/">a태그</a>
      {/* Link 컴포넌트가 NavLink와 다른 점은 active라는 class선택자가 부여되지 않는다. */}
      <Link to="/linkTag">Link 컴포넌트</Link>
    </nav>
  )
}

/**
 * Outlet컴포넌트
 * : 웹사이트 제작시 공통으로 사용되는 레이아웃에서 
 */
const CommonLayout = () => {
  return(
    <div>
      <header style={{background:'lightgray', padding:'10px'}}>
        Outlet 컴포넌트 알아보기
      </header>
      <article>
        {/** 각 페이지의 컴포넌트가 보여지는 부분에 설정한다 */}
        <Outlet/>
      </article>
      <footer style={{background:'lightgray', padding : '10px'}}>
        공통 레이아웃
      </footer>
    </div>
  )
}

const Home = () => {
  return(
    <>
      <h2>React Home</h2>
      <p>
        React Router에 대해 학습합니다.
      </p>
    </>
  )
}

/**
 * /intro 경로가 요청될 때 Outlet 컴포넌트 위치에 렌더링된다.
 * 이 부분은 <App>컴포넌트에 설정되어있다.
 */
const LayoutIndex = () => {
  return(
    <>
      <h2>레이아웃 인덱스 페이지</h2>
      <ul>
        <li>Outlet 컴포넌트 위치에 출력됩니다</li>
        <li>Route 설정 시 index로 지정합니다.</li>
      </ul>
    </>
  )
}

/**
 * /intro/router 경로가 요청될 때 Outlet 컴포넌트에 렌더링되는 컴포넌트
 */
const RouterHooks = () => {
  /**
   * useLocation 훅
   *  : React Router를 통해 라우팅된 페이지에서 현재 URL과 관련된 정보를 얻는데 사용
   *    URL 경로, 쿼리스트링 등의 관련정보를 제공한다.
   * 
   * useSearchParams 훅
   *  : 현재 URL의 쿼리스트링을 얻어오거나 조작할 때 사용한다.
   */
  const location = useLocation();

  // 쿼리스트링의 정보를 얻어오기 위한 변수와, 변경을 위한 함수까지 정의
  const [searchParams, setSearchParams] = useSearchParams();
  /**
   * 쿼리스트링에서 파라미터를 얻어온다. 첫 진입시에는 둘 다 null이 된다.
   * JSP의 request.getParameter()와 기능적으로 동일하다.
   */
  const mode = searchParams.get('mode');
  const pageNum = searchParams.get('pageNum');

  // 파라미터 mode의 값을 토글 시키는 함수
  const changeMode = () => {
    const nextMode = (mode==='list') ? 'view' : 'list';
    /**
     * 파라미터 변경을 위한 setXX() 함수를 통해 값을 변경할 땐
     * pageNum의 경우 값이 지정되지 않았으므로 기존의 값을 그대로 쓴다.
     */
    setSearchParams({
      mode : nextMode,
      pageNum
    });
  }

  // 다음 페이지로 이동하기 위한 파라미터 조작
  const nextPage = () => {
    // 페이지 번호가 없는 상태라면 1페이지로 지정하고, 아니면 +1
    let pageTemp = (pageNum === null || isNaN(pageNum)) ? 1 : parseInt(pageNum) + 1;
    if(pageTemp === 11){
      pageTemp = 10;
      // JSX에서는 window객체를 통해 alert()를 호출한다.
      window.alert('마지막 페이지입니다.');
    }
    // mode 고정, pageNum만 변경
    setSearchParams({
      mode,
      pageNum : pageTemp
    });
  }

  const prevPage = () => {
    let pageTemp = (pageNum === null || isNaN(pageNum)) ? 1 : parseInt(pageNum) - 1;
    if(pageTemp === 0){
      pageTemp = 1;
      window.alert('첫 번째 페이지입니다.');
    }
    setSearchParams({
      mode,
      pageNum : pageTemp
    });
  }

  return(
    <>
      <h2>라우터 관련 Hook</h2>
      <div>
        <ul>
          {/* useLocatio 훅을 통해 얻을 수 있는 정보 */}
          {/* pathname : 쿼리스트링을 제외한 경로까지를 반환 */}
          <li>URL : {location.pathname}</li>
          <li>쿼리스트링 : {location.search}</li>
          <li>mode : {mode}</li>
          <li>detail : {pageNum}</li>
        </ul>

        {/* 버튼에 함수 연결시, 이벤트리스너에는 함수명만 기술해주면 된다. */}
        <button onClick={changeMode}>mode변경</button>
        <button onClick={prevPage}>이전 Page</button>
        <button onClick={nextPage}>다음 page</button>
      </div>
    </>
  )
}

/**
 * 설정된 경로 외 잘못된 경로를 요청했을 때 렌더링되는 컴포넌트.
 */
const NotFound = () => {
  return(
    <>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. <br />
        <Link to='/'>Home</Link>
      </p>
    </>
  )
}

function App() {
  return (<>
  {/* 전체 페이지에서 공통으로 출력할 컴포넌트는 라우터 처리가 필요없다. */}
  <TopNavi />
  {/* 라우터 처리가 필요한 컴포넌트들.
    path, element라는 props를 통해 경로와 렌터링할 컴포넌트 지정 */}
  <Routes>
    <Route path='/' element={<Home/>} />
    {/* 하위 경로가 필요한 경우 라우터를 중첩한다. */}
    <Route path='/intro' element={<CommonLayout/>} > 
      {/* /intro 요청이 들어오면 LayoutIndex 컴포넌트 렌더링 (<Outlet/>에) */}
      <Route index element={<LayoutIndex/>} />
      {/* /intro/router 요청이 들어오면 RouterHooks 컴포넌트 렌더링 (<Outlet/>에)*/}
      <Route path='router' element={<RouterHooks/>} />
    </Route>
    {/* 지정되지 않은 경로는 404 처리 */}
    <Route path='*' element={<NotFound/>} />
  </Routes>
  </>)
}

export default App
