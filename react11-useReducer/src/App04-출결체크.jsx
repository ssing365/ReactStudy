import { useReducer, useState } from "react";
import "./App.css";

/** 학생 컴포넌트 */
const Student = ({ name, dispatch, id, isHere }) => {
  return (
    <>
      <div>
        {/* 학생 이름. 클릭 시 출석 기능 토글  */}
        <span
          style={{
            textDecoration : isHere ? 'line-through' : 'none',
            color : isHere ? 'gray' : 'black'
          }}
          onClick={() => {
            dispatch({ type: "mark", param: { id, isHere } });
            alert("출석처리");
          }}
        >
          {name}
        </span>
        {/* 삭제 버튼 */}
        <button
          onClick={() => {
            if (window.confirm("삭제할까요?")) {
              dispatch({ type: "delete", param: { name } });
              alert("삭제");
            }
          }}
        >
          삭제
        </button>
      </div>
    </>
  );
};

/** Reducer 함수 선언. 이전 state값과 action을 매개변수로 정의 */
const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      // 학생 추가
      // 학생 이름을 파라미터를 통해 받기
      const name = action.param.name;
      // 새로운 학생 객체 생성
      const newStudent = {
        id: Date.now(),
        name, // 이름은 key와 value가 동일하므로 하나만 작성
        isHere: false, // 출석 여부
      };
      return {
        count: state.count + 1, // 학생 수 증가
        students: [...state.students, newStudent], // 기존 배열에 새로운 객체 추가
      };
    }
    case "delete": {
      const name = action.param.name;
      console.log(state.students);
      let deleted_students = state.students.filter((student) => {
        return name !== student.name;
      });
      return {
        count: state.count - 1,
        students: [...deleted_students],
      };
    }
    case "mark": {
      let id = action.param.id;
      const isHere = action.param.isHere;

      console.log("id : ", id, "isHere : ", isHere);

      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === id) {
            return {...student, isHere: !isHere}
          }
          return student
        })
      };
    }
    default:
  }
};

// 출력할 출석부의 초깃값
const initialState = {
  count: 1,
  students: [
    {
      id: Date.now(),
      name: "김철수",
      isHere: false,
    },
  ],
};

function App() {
  // 추가할 학생의 이름
  const [name, setName] = useState("");
  // Reducer 변수 생성. studentInfo는 initialState를 초깃값으로 설정
  const [studentInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>총 학생수 : {studentInfo.count}</p>
      {/* 추가할 학생의 이름을 입력하기 위한 상자 */}
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* 버튼을 누르면 dispatch를 통해 action객체를 reducer로 전달하여 학생을 추가한다. */}
      <button
        onClick={() => {
          dispatch({ type: "add", param: { name } });
          setName("");
        }}
      >
        추가
      </button>
      {/* 데이터에 입력된 학생수만큼 <Student>컴포넌트를 반복 출력한다. */}
      {studentInfo.students.map((student) => {
        return (
          <Student
            key={student.id}
            name={student.name}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
    </>
  );
}
export default App;
