
import { initializeApp} from "firebase/app";
import { initializeAuth, getAuth,getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV6vTlAeSqx61Ix1p9qT4_ZNM4t6S57sE",
  authDomain: "reactnative-fuel-app.firebaseapp.com",
  projectId: "reactnative-fuel-app",
  storageBucket: "reactnative-fuel-app.appspot.com",
  messagingSenderId: "427233237225",
  appId: "1:427233237225:web:65ab633069c1c2fb2d3878"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  const db = getFirestore(app)
  export { auth,db };