// Firebase 서비스에 연결하기 위한 Import
import { initializeApp } from "firebase/app";
// 파이어스토어 DB를 사용하기 위한 Import
import { getFirestore } from 'firebase/firestore'
// 구글 애널리틱스
// import { getAnalytics } from "firebase/analytics";

// .env 파일 생성 전
// const firebaseConfig = {
//   apiKey: "AIzaSyANV_ogkX5emU45HwQuG2EDtQklixkjFfY",
//   authDomain: "myreactapp-47671.firebaseapp.com",
//   projectId: "myreactapp-47671",
//   storageBucket: "myreactapp-47671.firebasestorage.app",
//   messagingSenderId: "436337717875",
//   appId: "1:436337717875:web:5ebe25663307d7b3c0b006",
//   measurementId: "G-DX3JGEC18J"
// };

// .env 파일 생성 후
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
}


// Initialize Firebase (Firebase에 연결한 후 앱 초기화)
const app = initializeApp(firebaseConfig);
// firestore 사용을 위한 객체 생성
const firestore = getFirestore(app);
export {firestore};

// 구글 애널리틱스
// const analytics = getAnalytics(app);
// export {analytics}