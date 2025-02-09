import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function MyList(props){
    var [myJSON, setMyJSON] = useState([]);

    useEffect(function(){
        /**
         * Javascript에서 비동기통신을 지원하는 함수로,
         * Spring 서버의 목록 API를 호출하여 결과를 콜백받는다.
         */

        fetch("http://localhost:8586/restBoardList.do?pageNum=1")
        .then((result)=>{
            console.log("결과1");
            console.log(result);
            // 첫 번째 then절에서 반환하는 값이 두 번째 then절로 넘어간다.
            return result.json();
        })
        .then((json)=>{
            console.error("결과");
            console.log(json);
            // 콜백받은 데이터를 통해 state변경
            setMyJSON(json);
        });
        return () => {
            console.log("#Life", "useEffect실행 => 컴포넌트 언마운트");
        }
    }, []);

    let trTag = [];
    for(let i=0; i<myJSON.length; i++){
        let data = myJSON[i];
        console.log(data);
        trTag.push(
            <tr key = {data.num}>
                <td>{data.num}</td>
                <td><Link to={'/view/'+data.num}>{data.title}</Link></td>
                <td>{data.id}</td>
                <td>{data.postdate}</td>
                <td>{data.visitcount}</td>
            </tr>
        )
    }
    return(
        <>
            <h2>Spring 게시판 [목록]</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>num</th>
                        <th>title</th>
                        <th>id</th>
                        <th>postdate</th>
                        <th>visitcount</th>
                    </tr>
                </thead>
                <tbody>{trTag}</tbody>
            </table>
            <Link to="/write">작성</Link>
        </>
    )
}

export default MyList;