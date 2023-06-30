import { useEffect, useState, useContext } from "react";
import { allNewDice, formatNumCount, genereateNewDie } from "../helpers";
import { GlobalContext } from "../Context";

const defaultTenziesStats = {
	minutes: 0,
	seconds: 0,
};

export default function useGame() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const { setIsGameOver, tenziesStats, setTenziesStats,setRolls }: any =
		useContext(GlobalContext);

	const gameCounter = `${formatNumCount(tenziesStats.minutes)}:${formatNumCount(
		tenziesStats.seconds
	)}`;

	useEffect(() => {
		// reset seconds upon each visit to game page
		setTenziesStats((prevStat: any) => ({
			...prevStat,
			seconds: 0,
		}));
	}, []);

	useEffect(() => {
		const interv = setInterval(() => {
			if (!tenzies) {
				setTenziesStats((prevStat: any) => ({
					...prevStat,
					seconds: prevStat.seconds + 1,
				}));
			}
		}, 1000);

		return () => {
			clearInterval(interv);
		};
	}, [tenziesStats, tenzies]);

	useEffect(() => {
		if (tenziesStats.seconds === 60) {
			setTenziesStats((prevStat: any) => ({
				...prevStat,
				minutes: prevStat.minutes + 1,
				seconds: 0,
			}));
		}
	}, [tenziesStats]);

	useEffect(() => {
		const allDiceIsHeld = dice.every((die) => die.isHeld);
		const firstDiceValue = dice[0].value;
		const allSameDiceValue = dice.every((die) => die.value === firstDiceValue);

		if (allDiceIsHeld && allSameDiceValue) {
			setTenzies(true);
		}
	}, [dice]);

	function playGameAgain() {
		setTenziesStats(defaultTenziesStats);
		setRolls(0)
		newGame();
		setIsGameOver(false);
	}

	function rollDice() {
		const newRollDice = dice.map((die) => {
			return die.isHeld ? die : genereateNewDie();
		});
		setDice(newRollDice);
		setRolls((prevRoll:any) => prevRoll + 1)
	}

	function holdDice(id: string) {
		const heldDie = dice.map((die) => {
			return die.id === id ? { ...die, isHeld: !die.isHeld } : die
		});
		setDice(heldDie);
	}

	function newGame() {
		return setTenzies(false), setDice(allNewDice());
	}

	return {
		dice,
		tenzies,
		gameCounter,
		playGameAgain,
		rollDice,
		holdDice,
		newGame,
		setTenzies,
	};
}
