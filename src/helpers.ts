import { nanoid } from "nanoid";

export function formatNumCount(count: number) {
	if (count < 10) {
		return `0${count}`;
	}
	return count;
}

// change time from string in MM:SS to numbers
export function formatTime(mins: number, secs: number) {
	return mins * 60 + secs;
}

export function formatTimeToMinsSecs(secs: number) {
	let count = 0;
	while (secs > 59) {
		count += 1;
		secs - 60;
	}
	return `${formatNumCount(count)}:${formatNumCount(secs)}`;
}

export function genereateNewDie() {
	return {
		value: Math.floor(Math.random() * 6) + 1,
		isHeld: false,
		id: nanoid(),
	};
}

export function allNewDice() {
	const dieValueArray = [];
	for (let i = 0; i < 10; i++) {
		dieValueArray.push(genereateNewDie());
	}
	return dieValueArray;
}
