import React from "react";

// 작성하기의 네비게이션
function NavEdit(props) {
  return (
    <nav>
      {/** 수정은 '열람'에서 진입하게 되므로 '뒤로'는 열람으로 전환 */}
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onBack();
      }}>뒤로</a>
      {" "}
      <a
        href="/"
        onClick={function (event) {
          event.preventDefault();
          props.onChangeMode();
        }}
      >목록</a>
    </nav>
  );
}

export default NavEdit;