import { useContext } from 'react';
import { SimpleContext } from '../context/SimpleContext';

const CompContext2b = () => {
  const contextData = useContext(SimpleContext);
  return(
    <div>
      <h4>Context2b 컴포넌트</h4>
      {contextData.str} <br />
      myNumber : {contextData.num}
      {console.log('2b',contextData)}
    </div>
  )
}

export default CompContext2b;