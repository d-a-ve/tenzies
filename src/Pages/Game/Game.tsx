import { useContext, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/windowSize";
import useGame from "../../hooks/useGame";
import useFirebase from "../../hooks/useFirebase";

import Die from "../../components/Die";
import HighScoreModal from "../../components/HighScoreModal";
import HallOfFame from "../../components/HallOfFame";
import { GlobalContext } from "../../Context";
import BackBtn from "../../components/BackBtn";
import ModalFooter from "../../components/ModalFooter";

export default function Game() {
	const { isGameOver, rolls }: any = useContext(GlobalContext);
	const { width, height } = useWindowSize();
	const {
		tenzies,
		seconds,
		setTenzies,
		setSeconds,
		dice,
		holdDice,
		gameCounter,
		newGame,
		rollDice,
		playGameAgain,
	} = useGame();
	const { btnLoading, firebaseSignIn } = useFirebase();

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

	useEffect(() => {
		const allIsHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);

		if (allIsHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	useEffect(() => {
		const interv = setInterval(() => {
			if (!tenzies) {
				setSeconds((prev) => prev + 1);
			}
		}, 1000);

		return () => {
			clearInterval(interv);
		};
	}, [seconds]);

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
					<HallOfFame />
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
