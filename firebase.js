import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFmpuxcFSrWqPetrHPIzbXcQslgOLvm_s",
  authDomain: "proyectofinalweb-9a87c.firebaseapp.com",
  projectId: "proyectofinalweb-9a87c",
  storageBucket: "proyectofinalweb-9a87c.appspot.com",
  messagingSenderId: "588259967500",
  appId: "1:588259967500:web:8606379709adb59e3fa429"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
