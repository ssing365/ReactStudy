import React from "react";

function ComWrite(props){
  const myData = props.myData;
  const setMyData = props.setMyData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const nowDate = props.nowDate;

  return (<>
    <form onSubmit={(event)=>{
      event.preventDefault();
      let w = event.target[0].value;
      let c = event.target[2].value;

      // 추가할 객체 생성
      let addMyData = {no:nextNo, comment:c, writer:w, date:nowDate()};

      /** 추가 */
      // 복사본 생성 후 데이터 추가
      let copyMyData = [...myData];
      copyMyData.push(addMyData);
      // state 업데이트
      setMyData(copyMyData);
      // 시퀀스 번호 업데이트
      setNextNo(nextNo+1);

      event.target[0].value='';
      event.target[2].value='';
    }}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer"/></td>
          <td rowSpan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment"></textarea></td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComWrite;  
