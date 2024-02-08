import {getApp, initializeApp, FirebaseApp} from "firebase/app";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";

let app: FirebaseApp;
if (process.env.NODE_ENV === "production") {
  app = getApp();
} else {
  const firebaseConfig = {
    apiKey: "AIzaSyBBa2iIUnEFhKhVHT3wcepiVEl4BOfOOYA",
    authDomain: "taliferro-de66f.firebaseapp.com",
    databaseURL: "https://taliferro-de66f.firebaseio.com",
    projectId: "taliferro-de66f",
    storageBucket: "taliferro-de66f.appspot.com",
    messagingSenderId: "353334442276",
    appId: "1:353334442276:web:45b043204cc83aa7725bb1",
    measurementId: "G-ZH2TKFHVZ7",
  };
  app = initializeApp(firebaseConfig);
}
const functions = getFunctions(app);

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("connecting firebase functions emulator");
  connectFunctionsEmulator(functions, window.location.hostname, 5001);
}

export {app, functions};
