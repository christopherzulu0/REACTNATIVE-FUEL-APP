
import { initializeApp} from "firebase/app";
import { initializeAuth, getAuth,getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF3_iJro9OnasNJI3Z46QmZCH1lmUTt8M",
  authDomain: "truckers-95774.firebaseapp.com",
  databaseURL: "https://truckers-95774-default-rtdb.firebaseio.com",
  projectId: "truckers-95774",
  storageBucket: "truckers-95774.appspot.com",
  messagingSenderId: "1073817008230",
  appId: "1:1073817008230:web:0ff522b15da2d53d14d5a7",
  measurementId: "G-C5B32ZHGGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  const db = getFirestore(app)
  export { auth,db };