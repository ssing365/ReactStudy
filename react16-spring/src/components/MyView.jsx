import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

function MyView(){
    /**
     * 파라미터로 전달되는 값을 받기위해 사용하는 훅
     * 내용보기의 요청명은 'view/일련번호' 형식으로 정의하였고,
     * Router처리시 num으로 결정되어있다.
     */
    const params = useParams();
    // 파라미터를 콘솔에 출력한다.
    console.log("파라미터", params.num);
    // API통신 후 얻어올 게시물의 레코드를 저장할 state
    const [boardRow, setBoardRow] = useState({});

    // 컴포넌트 렌더링 후 자동으로 호출되는 함수 정의
    useEffect(function(){
        // fetch()함수로 API호출. 이 때 일련번호를 변경해서 설정한다.
        fetch("http://localhost:8586/restBoardView.do?num="+params.num)
        .then((result)=>{
            return result.json();
        })
        .then((json)=>{
            console.error("결과");
            console.log(json);
            setBoardRow(json);
        });
        return () => {
            console.log("#Life", 'useEffect실행 => 컴포넌트 언마운트');
        }
    }, []);


    return(
        <>
            <h2>Spring 게시판[조회]</h2>
            <table border={1}>
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td>{boardRow.id}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{boardRow.title}</td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{boardRow.postdate}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>{boardRow.content}</td>
                    </tr>
                </tbody>

            </table>
            <Link to="/list"> 목록 </Link>
        </>
    )
}

export default MyView;