import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
	apiKey: "AIzaSyDiwp53cQvTUAvwsIm1njM9snxLR7vrh4k",
	authDomain: "learnlab-afe36.firebaseapp.com",
	projectId: "learnlab-afe36",
	storageBucket: "learnlab-afe36.appspot.com",
	messagingSenderId: "383410541403",
	appId: "1:383410541403:web:7542b64f3a3e1ed5cb407e",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export { app, auth, firestore };
