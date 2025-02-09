import {useNavigate} from 'react-router-dom';

function MyWrite(){
    // 페이지 이동을 위한 훅. JS의 location과 같은 기능 수행
    const navigate = useNavigate();

    return(
        <>
            <h2>Spring게시판[작성]</h2> 
            <form onSubmit={(event)=>{
                event.preventDefault();
                // event의 타겟 속성으로 전송된 폼값 저장
                let id = event.target.id.value;
                let title = event.target.title.value;
                let content = event.target.content.value;

                // 폼값을 서버로 전송하기 위해 조립할 때 사용하는 JS객체 생성
                const params = new URLSearchParams();
                params.set('id', id);
                params.set('title', title);
                params.set('content', content);

                /**
                 * fetch함수의 두 번째 인자로 사용할 JSON객체로서
                 * 전송방식을 post로 지정하고 서버로 전송할 폼값을 body에 추가한다.
                 */
                const data = {
                    method : 'POST',
                    headers : {
                        'Content0-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    body : params
                };

                // Spring 서버와 통신
                fetch('http://localhost:8586/restBoardWrite.do', data)
                    .then((result)=>{
                        return result.json();
                    })
                    // 콜백데이터로 글쓰기 성공 여부 확인
                    .then((json)=>{
                        console.log(json);
                        if(json.result === 1){
                            console.log("글쓰기 성공");
                        }
                    });
                    navigate("/list");
            }}>
                <table>
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td><input type="text" name="id" value={"test"}/></td>
                        </tr>
                        
                        <tr>
                            <th>제목</th>
                            <td><input type="text" name="title"/></td>
                        </tr>

                        
                        <tr>
                            <th>내용</th>
                            <td><textarea name="content" cols={22} rows={3}/></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value={"Submit"}/>
            </form>
        </>
    )
}

export default MyWrite;