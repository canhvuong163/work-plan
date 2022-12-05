import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";


// const firebaseConfig = {
//   apiKey: "AIzaSyBAXahyHiEhVUn1HtItqEnk9gusj7NhUds",
//   authDomain: "lee-schedule-toolkit.firebaseapp.com",
//   databaseURL: "https://lee-schedule-toolkit-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "lee-schedule-toolkit",
//   storageBucket: "lee-schedule-toolkit.appspot.com",
//   messagingSenderId: "10096590705",
//   appId: "1:10096590705:web:5a8ecead5492d1375540d0",
//   measurementId: "G-EE5R6DS72Z"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCVO1CXgAtHoWW4XC6ti1U-sol00Zxhcn0",
//   authDomain: "manager-work.firebaseapp.com",
//   databaseURL: "https://manager-work-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "manager-work",
//   storageBucket: "manager-work.appspot.com",
//   messagingSenderId: "1059686187147",
//   appId: "1:1059686187147:web:661967bdac91726eda148e",
//   measurementId: "G-TQXS2815PF"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDGG499rjuxR-YC9Kd2qRuXZyMcu2X4Br8",
  authDomain: "work-plan-1.firebaseapp.com",
  databaseURL: "https://work-plan-1-default-rtdb.firebaseio.com",
  projectId: "work-plan-1",
  storageBucket: "work-plan-1.appspot.com",
  messagingSenderId: "148801185808",
  appId: "1:148801185808:web:773638c8bbcab9444d4295",
  measurementId: "G-63CYGTC1WR"
};


const app = initializeApp(firebaseConfig);

export { app };