import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvSTu4PZa1qzCQYeyaHTmKSnEUu2NDzJA",
    authDomain: "authx-fb44b.firebaseapp.com",
    projectId: "authx-fb44b",
    storageBucket: "authx-fb44b.appspot.com",
    messagingSenderId: "754927348657",
    appId: "1:754927348657:web:9d1a6987127f30ab836b90",
    measurementId: "G-66QZBLVE8C"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export default firebaseConfig;