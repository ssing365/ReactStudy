import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

const Page = () => {
  // 데이터의 공유가 필요하다면 useContext훅을 통해 즉시 사용할 수 있다.
  const data = useContext(ThemeContext);
  console.log("Page컴포넌트", data);

  // props를 통해 자식 컴포넌트로 데이터를 전달하지 않아도 된다.
  return(
    <>
      <Header/>
      <Content/>
      <Footer/>
    </>
  )
}

export default Page;