import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "./hooks/windowSize";

export default function App() {
  // features:
  // 1. real dots on the dice
  // 2. track number of rolls to window
  // 3. track time it took to win a game
  // 4. save your best time to localstorage
  const [isStarted, setIsStarted] = React.useState(false)
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  const [interv, setInterv] = React.useState<number>()
  const [numOfRolls, setNumOfRolls] = React.useState(0)
  const gameCounter = `${formatNumCount(minutes)}:${formatNumCount(seconds)}`
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const allIsHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allIsHeld && allSameValue) {
      setTenzies(true);
      stopCounter()
      console.log("Dice changed");
    }
  }, [dice]);

  function startCounter() {
    setInterv(setInterval(() => {
      setSeconds(prev => prev + 1)
    },1000))
  }

    if(seconds === 60) {
      setMinutes(prev => prev + 1)
      setSeconds(0)
    }
    
  function stopCounter() { // clears the interval and stop the counter
    clearInterval(interv)
  }

  function startGame() {
    setIsStarted(true)
    startCounter()
  }

  function formatNumCount(count:number) {
    if(count < 10){
      return `0${count}`
    }
    return count
  }

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

  function genereateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const dieValueArray = [];
    for (let i = 0; i < 10; i++) {
      dieValueArray.push(genereateNewDie());
    }
    return dieValueArray;
  }

  function rollDice() {
    const newRollDice = dice.map((die) => {
      return die.isHeld ? die : genereateNewDie();
    });
    setDice(newRollDice);
    setNumOfRolls(prev => prev + 1)
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

  return isStarted 
  ? (

    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p>
        Number of rolls: {numOfRolls}
      </p>
      <p className="instruction">
        {gameCounter}
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="die-container">{mappedDice}</div>
      <button onClick={tenzies ? newGame : rollDice} className="roll-btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
  : <button onClick={startGame}>Start Game</button>
}
