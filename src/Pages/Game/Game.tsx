import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/windowSize";
import {
	formatNumCount,
	formatTime,
	genereateNewDie,
	allNewDice,
} from "../../helpers";
import { UserType } from "../../types";
import { db, auth, provider } from "../../App";

import Die from "../../components/Die";
import HighScoreModal from "../../components/HighScoreModal";
import HallOfFame from "../../components/HallOfFame";
import { GlobalContext } from "../../Context";
import BackBtn from "../../components/BackBtn";
import ModalFooter from "../../components/ModalFooter";

export default function Game() {
	const [user, setUser] = React.useState<UserType>();
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);
	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false);
	const [rolls, setRolls] = React.useState(0);
	const [btnLoading, setBtnLoading] = React.useState(false);
	const { isGameOver, setIsGameOver, usersScores, setUsersScores }: any =
		React.useContext(GlobalContext);
	const gameCounter = `${formatNumCount(minutes)}:${formatNumCount(seconds)}`;
	const { width, height } = useWindowSize();

	const mappedDice = dice.map((die) => {
		return (
			<Die
				key={die.id}
				value={die.value}
				isHeld={die.isHeld}
				id={die.id}
				hold={holdDice}
			/>
		);
	});

	React.useEffect(() => {
		const allIsHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);

		if (allIsHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	React.useEffect(() => {
		createUpdateUserDoc();
	}, [user]);

	React.useEffect(() => {
		userSignedIn();
	}, []);

	React.useEffect(() => {
		const interv = setInterval(() => {
			if (!tenzies) {
				setSeconds((prev) => prev + 1);
			}
		}, 1000);

		return () => {
			clearInterval(interv);
		};
	}, [seconds]);

	// increase minutes by 1 and change seconds back to 0
	if (seconds === 60) {
		setMinutes((prev: number) => prev + 1);
		setSeconds(0);
	}

	function playGameAgain() {
		setMinutes(0);
		setSeconds(0);
		setRolls(0);
		newGame();
		setIsGameOver(false);
	}

	function rollDice() {
		const newRollDice = dice.map((die) => {
			return die.isHeld ? die : genereateNewDie();
		});
		setDice(newRollDice);
		setRolls((prev) => prev + 1);
	}

	function holdDice(id: string) {
		const holdedDie = dice.map((die) => {
			if (die.id === id) {
				return { ...die, isHeld: !die.isHeld };
			} else {
				return die;
			}
		});
		setDice(holdedDie);
	}

	function newGame() {
		return setTenzies(false), setDice(allNewDice());
	}

	function userSignedIn() {
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
				console.log(errorCode, errorMessage, email, credential);
			});
	}

	async function createUpdateUserDoc() {
		// safe guard, so we don't create or update the user doc if they have not played a game yet
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

			setIsGameOver(true);
			setBtnLoading(false);
		}
	}

	return (
		<div className="game-height">
			<main className={`game-main ${tenzies ? "opaque" : ""}`}>
				{tenzies && <Confetti width={width} height={height} />}
				<div className="back-btn-container">
					<BackBtn to=".." />
				</div>
				<h1 className="title">Tenzies</h1>
				<div className="game-result-container">
					<p> {gameCounter}</p>
					<p>Number of rolls: {rolls}</p>
				</div>
				<p className="instruction">
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls
				</p>
				<div className="die-container">{mappedDice}</div>
				<button onClick={tenzies ? newGame : rollDice} className="btn roll-btn">
					{tenzies ? "New Game" : "Roll"}
				</button>
			</main>
			{tenzies && !isGameOver && (
				<HighScoreModal
					time={gameCounter}
					numOfRolls={rolls}
					signIn={firebaseSignIn}
					playGame={playGameAgain}
					btnLoading={btnLoading}
				/>
			)}
			{isGameOver && (
				<div className="modal">
					<HallOfFame
						usersScores={usersScores}
						setUsersScores={setUsersScores}
					/>
					<ModalFooter
						showJoin={false}
						signIn={firebaseSignIn}
						playGame={playGameAgain}
					/>
				</div>
			)}
		</div>
	);
}
