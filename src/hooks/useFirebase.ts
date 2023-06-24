import { useEffect, useState, useContext } from "react";
import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import {
	getFirestore,
	doc,
	setDoc,
	serverTimestamp,
	collection,
	getDocs,
} from "@firebase/firestore";
import { UserType } from "../types";
import { formatTime, formatTimeToMinsSecs } from "../helpers";
import { GlobalContext } from "../Context";
import useGame from "./useGame";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function useFirebase() {
	const [user, setUser] = useState<UserType>();
	const [btnLoading, setBtnLoading] = useState(false);
	const { minutes, seconds } = useGame();
	const { setIsGameOver, rolls }: any = useContext(GlobalContext);

	// useEffect(() => {
	// 	createUpdateUserDoc();
	// }, [user]);

	// useEffect(() => {
	// 	userSignedIn();
	// }, []);

	function userSignedIn() {
    console.log("user signin func ran")
    console.log(auth.currentUser)
		// if the user is already signed in, do not sign in again and add the user to state
		if (auth.currentUser) {
			const user = auth.currentUser;
			console.log("already signed in");
			setUser({
				email: user?.email,
				name: user?.displayName,
				uid: user?.uid,
			});
			return true;
		}
		return false;
	}

	function firebaseSignIn() {
		setBtnLoading(true);
		// if (userSignedIn()) return;

		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				setUser({
					email: user?.email,
					name: user?.displayName,
					uid: user?.uid,
				});
				console.log("inside signin", user);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log(errorCode, errorMessage, email, credential);
			});
	}
	console.log(rolls);

	console.log("outside signin", user);
	async function createUpdateUserDoc() {
		// safe guard, so we don't create or update the user doc if they have not played a game yet
		console.log("Start ran");
		if (rolls === 0) return;

		if (user && user.uid) {
			const usersColRef = doc(db, "users", user.uid);

			await setDoc(usersColRef, {
				uid: user.uid,
				email: user.email,
				name: user.name,
				gameTime: formatTime(minutes, seconds),
				numOfRolls: rolls,
				createdAt: serverTimestamp(),
			});
			console.log("end ran");

			setIsGameOver(true);
			setBtnLoading(false);
		}
	}

	async function getUsersScores() {
		const res: any[] = [];
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			const { name, uid, numOfRolls, gameTime } = doc.data();
			res.push({
				name: name,
				uid: uid,
				numOfRolls: numOfRolls,
				gameTime: formatTimeToMinsSecs(gameTime),
			});
		});
		return res;
	}

	return { firebaseSignIn, btnLoading, createUpdateUserDoc, getUsersScores };
}
