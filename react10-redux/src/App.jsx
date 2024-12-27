import "./App.css";
/** 리덕스 스토어를 생성하기 위한 패키지 임포트 */ 
import { legacy_createStore as createStore } from "redux";
/** 리덕스를 관리하기 위해 필요한 provider 컴포넌트와 관련 Hook에 대한 패키지 임포트 */
import { Provider, useSelector, useDispatch } from 'react-redux'

/**
 * Redux
 * : React로 제작한 애플리케이션의 상태관리를 위한 라이브러리
 * React와 함께 사용되지만 써드파티로 제공되므로 별도로 설치해야한다.
 */

/**
 * store생성 시 주입할 Reducer함수를 먼저 생성한다.
 * Reducer는 store에 있는 state를 변경하기 위한 코드를 실행부로 정의한다.
 * 파라미터는 2개가 필요하다.
 *  currentState : 현재 state값
 *  action : state 변경에 필요한 요청 파라미터. 
 *           2개 이상의 값을 전달할 수 있어야 하므로 JSON객체를 주로 사용한다.
 */
function reducer(currentState, action) {
  /** state값이 없으면 1로 초기화 
   * 기존 App에서는 최상위 컴포넌트에서 useState를 통해 state를 생성했지만
   * Redux가 도입되면 store에서 state를 생성 및 관리한다.
   */ 

  if (currentState === undefined) {
    return {
      number: 1,
    };
  }

  // 스프레드 연산자로 현재 state의 복사본 생성
  const newState = { ...currentState };

  // 요청(action 객체)을 분석한 후 state변경
  if (action.type === "PLUS") {
    newState.number++;
  }

  /** 변경된 state를 반환하여 적용한다. setter를 호출하는 것과 동일하다. */
  //  이게 dispatch함수가 전달해주겠지
  return newState;
}

// 앞에서 정의한 reducer함수를 인자로 store를 생성한다.
const store = createStore(reducer);

/**
 * store가 도입되면 Right, Left 컴포넌트에서 사용하던 props는 더 이상 필요하지 않다.
 */
const Right1 = () => {
  return (
    <div>
      <h2>Right1</h2>
      <Right2 />
    </div>
  );
};
const Right2 = () => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3 />
    </div>
  );
};

/**
 * useDispatch 훅
 *  : state값을 변경할 때 reducer함수를 호출하는 역할을 한다.
 * 자바가 메인함수를 호출하는 일은 없는것처럼 reducer()함수를 직접 호출하는 구조는없다.
 * dispatch()함수를 호출하면 reducer()함수가 호출된다.
 */
const Right3 = () => {
  /**
   * type을 PLUS로 설정하여 Store에 정의된 Reducer를 호출한다.
   * JSON객체로 생성하면 되고, 이 객체를 Action이라고 한다.
   */
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Right3</h2>
      <input
        type="button"
        value={"+"}
        onClick={() => {
          // dispatch가 액션 전달
          dispatch({ type: "PLUS" });
        }}
      />
    </div>
  );
};

const Left1 = () => {
  return (
    <div>
      <h2>Left1</h2>
      <Left2 />
    </div>
  );
};
const Left2 = () => {
  return (
    <div>
      <h2>Left2</h2>
      <Left3 />
    </div>
  );
};

/**
 * useSelector()훅
 *  : state값을 선택할 때 사용한다.
 */
const Left3 = () => {
  /**
   * store에 정의된 여러 개의 state중 어떤 값을 받을지를 정의한 함수를 useSelecotr의 인자로 전달
   * 이 함수는 개발자가 여러 형태로 커스텀할 수 있다.
   */

  //어떤 state를 받을지 결정하기 위한 함수 정의
  // function f(state){
  //   return state.number;
  // }
  // 정의한 함수를 인수로 전달한다.
  // const number = useSelector(f);

  const number = useSelector((state) => {
    return state.number;
  });
  return (
    <div>
      <h2>Left3 : {number} </h2>
    </div>
  );
};
function App() {
  // store가 생성되었으므로 App에서는 state를 관리하지 않는다.
  // const [number, setNumber] = useState(1);

  /**
   * Provider 컴포넌트
   * : 어떤 컴포넌트에 state를 제공할지 결정하는 Wrapper 컴포넌트
   * 하위의 모든 컴포넌트에서 store를 공유할 수 있다.
   */
  return (
    <div className="root">
      <h2>React - Redux</h2>
      <div id="grid">
        {/* Left1과 Right1 컴포넌트에서 store를 공유할 수 있다. */}
        <Provider store={store}>
          <Left1 />
          <Right1 />
        </Provider>
      </div>
    </div>
  );
}

export default App;
