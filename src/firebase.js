import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage, ref} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFmpuxcFSrWqPetrHPIzbXcQslgOLvm_s",
  authDomain: "proyectofinalweb-9a87c.firebaseapp.com",
  projectId: "proyectofinalweb-9a87c",
  storageBucket: "proyectofinalweb-9a87c.appspot.com",
  messagingSenderId: "588259967500",
  appId: "1:588259967500:web:8606379709adb59e3fa429"
};

let app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);
