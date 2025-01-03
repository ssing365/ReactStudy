import React from "react";

function ArticleView({selectRow}) {
  console.log("선택한 게시물 : ", selectRow);
  return (
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{selectRow.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{selectRow.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{selectRow.date}</td>
          </tr>
          <tr>
            <th>내용1</th>
            {/** JS의 고차함수인 map()을 이용해서 줄바꿈이 된 횟수만큼 반복해 <br>로 변경 */}
            <td>
              {
                selectRow.contents.split('\n').map((currVal)=>{
                  console.log(currVal);
                  return(<>
                    {currVal} <br key={Math.random()} />
                  </>);
                })
              }
            </td>
          </tr>
          {/** CSS의 white-space속성을 적용해 줄바꿈 처리한다. */}
          <tr>
            <th>내용2</th>
            <td style={{'whiteSpace':'pre-wrap'}}>
              {selectRow.contents}
            </td>
          </tr>
          <tr>
            <th>내용3</th>
            <td className="contWrap">
            {selectRow.contents}
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

export default ArticleView;