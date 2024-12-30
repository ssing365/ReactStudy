import { useContext } from 'react';
// Context file import
import { SimpleContext } from '../context/SimpleContext';

const CompContext2a = () => {
  // useContext 변수 생성. 이 때 임포트할 파일을 인수로 전달
  const contextData = useContext(SimpleContext);
  return(
    <div>
      <h4>Context2a 컴포넌트</h4>
      {contextData}
      {console.log('2a',contextData)}
    </div>
  )
}

export default CompContext2a;