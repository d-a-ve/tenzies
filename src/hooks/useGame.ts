import { useEffect, useState, useContext } from "react";
import { allNewDice, formatNumCount, genereateNewDie } from "../helpers";
import { GlobalContext } from "../Context";

export default function useGame() {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const { setIsGameOver, rolls, setRolls }: any = useContext(GlobalContext);

	const gameCounter = `${formatNumCount(minutes)}:${formatNumCount(seconds)}`;


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
		setRolls((prev:number) => prev + 1);
		console.log("rolled successsfully");
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

	// increase minutes by 1 and change seconds back to 0
	if (seconds === 60) {
		setMinutes((prev: number) => prev + 1);
		setSeconds(0);
	}

	return {
		minutes,
		seconds,
		dice,
		tenzies,
		gameCounter,
		playGameAgain,
		rollDice,
		holdDice,
		newGame,
		setTenzies, setSeconds
	};
}
