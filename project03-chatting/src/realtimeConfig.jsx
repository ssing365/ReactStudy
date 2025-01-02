// Firebase 서비스에 연결하기 위한 Import
import { initializeApp } from "firebase/app";
// Realtime DB를 사용하기 위한 Import
import { getDatabase } from 'firebase/database'
// 구글 애널리틱스
// import { getAnalytics } from "firebase/analytics";

// .env 파일 생성 후
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  databaseURL: import.meta.env.VITE_databaseURL,
}

// Initialize Firebase (Firebase에 연결한 후 앱 초기화)
const app = initializeApp(firebaseConfig);
// Realtime DB 사용을 위한 객체 생성
const realtime = getDatabase(app);
export {realtime};

// 구글 애널리틱스
// const analytics = getAnalytics(app);
// export {analytics}