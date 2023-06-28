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
import { UserStatsType, UserType } from "../types";
import { formatTime } from "../helpers";
import { GlobalContext } from "../Context";

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
	const { setIsGameOver, tenziesStats, isGameOver, rolls }: any =
		useContext(GlobalContext);

	useEffect(() => {
			async function createAndUpdateUserDoc() {
				// safe guard, so we don't create or update the user doc if they have not played a game yet
				if (rolls === 0) return;

				if (user && user.uid) {
					const usersColRef = doc(db, "users", user.uid);

					await setDoc(usersColRef, {
						uid: user.uid,
						email: user.email,
						name: user.name,
						gameTime: formatTime(tenziesStats.minutes, tenziesStats.seconds),
						numOfRolls: rolls,
						createdAt: serverTimestamp(),
					});
				}
				setBtnLoading(false);
			}
		isGameOver && createAndUpdateUserDoc();
	}, [user, tenziesStats, isGameOver]);

	useEffect(() => {
		userSignedIn();
	}, []);

	function userSignedIn() {
		// if the user is already signed in, do not sign in again and add the user to state
		if (auth.currentUser) {
			const user = auth.currentUser;

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
		setIsGameOver(true);
		if (userSignedIn()) return;

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
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	async function getUsersScores() {
		const res = [] as UserStatsType;
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			const { name, uid, numOfRolls, gameTime } = doc.data();

			res.push({
				name: name,
				uid: uid,
				numOfRolls: numOfRolls,
				gameTime: gameTime,
			});
		});
		return res;
	}

	return { firebaseSignIn, btnLoading, getUsersScores };
}
