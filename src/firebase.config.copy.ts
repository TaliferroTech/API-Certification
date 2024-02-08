import {initializeApp} from "firebase/app";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("connecting firebase functions emulator");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export {app, functions};
