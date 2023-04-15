import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0DfH4W4uY6nPVaqjmtpDGGInK-FPuSiw",
  authDomain: "vdshap-1e3a1.firebaseapp.com",
  projectId: "vdshap-1e3a1",
  storageBucket: "vdshap-1e3a1.appspot.com",
  messagingSenderId: "124516931747",
  appId: "1:124516931747:web:14d32c3f16e72dbf8cc716",
  measurementId: "G-7J1MWGVWMV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
