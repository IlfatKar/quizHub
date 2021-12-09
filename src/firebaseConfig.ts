import {initializeApp} from 'firebase/app';
import {getDatabase} from "firebase/database";

const app = initializeApp({
  apiKey: "AIzaSyAyDpwgCI1yMGGKMTdSGqcXEslzhUG-duI",
  authDomain: "quizhub-50f2e.firebaseapp.com",
  projectId: "quizhub-50f2e",
  storageBucket: "quizhub-50f2e.appspot.com",
  messagingSenderId: "636354704235",
  appId: "1:636354704235:web:5b928dc1e6a9e67ded922e",
  databaseURL: "https://quizhub-50f2e-default-rtdb.europe-west1.firebasedatabase.app/",
});
export const database = getDatabase(app);