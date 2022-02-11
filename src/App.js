import './App.css'
import LetterRow from './LetterRow'
import Keyboard from './Keyboard'
import {useEffect, useState} from 'react'
import wordList from './six-letter-words'

var mysteryWord = generateWord().toUpperCase()
var guessCount = 1
var gameOver = false
var gameWon = false

function generateWord() {
  let i = Math.floor(Math.random() * wordList.words.length);
  return wordList.words[i]
}

function App() {
  const [guessWord, setGuessWord] = useState("")

  const [redGuesses, setRedGuesses] = useState("")
  const [yellowGuesses, setYellowGuesses] = useState("")
  const [greenGuesses, setGreenGuesses] = useState("")

  const [firstGuessWordColours, setFirstGuessWordColours] = useState("")
  const [secondGuessWordColours, setSecondGuessWordColours] = useState("")
  const [thirdGuessWordColours, setThirdGuessWordColours] = useState("")
  const [fourthGuessWordColours, setFourthGuessWordColours] = useState("")
  const [fifthGuessWordColours, setFifthGuessWordColours] = useState("")
  const [sixthGuessWordColours, setSixthGuessWordColours] = useState("")

  const [firstGuess, setFirstGuess] = useState("")
  const [secondGuess, setSecondGuess] = useState("")
  const [thirdGuess, setThirdGuess] = useState("")
  const [fourthGuess, setFourthGuess] = useState("")
  const [fifthGuess, setFifthGuess] = useState("")
  const [sixthGuess, setSixthGuess] = useState("")
 
  function handleWordChange(letter) {
    if (letter.length === 1) {
      if (guessWord.length === 6) { return } //limit to 6 letters input
      setGuessWord(guessWord + letter)
    } else if (letter === "del") {
      setGuessWord(guessWord.slice(0, -1))
    } else if (letter === "enter") {
      if (guessWord.length < 6) { return } //only allow guess when it's 6 letters long
      evaluateGuess(guessWord)
      setGuessWord("")
    }
  }

  function evaluateGuess(guessWord) {
    //check if word in dictionary?
    
    let newGreenGuesses = ""
    let newYellowGuesses = ""
    let newRedGuesses = ""
    let newGuessWordColours = ""
    let guessArray = Array.from(guessWord)

    for (let i = 0; i < guessArray.length; i++) { 
      let letter = guessArray[i]
      if (mysteryWord.includes(letter)) {
        if (mysteryWord[i] === guessArray[i]) {
          newGuessWordColours += "G"
          newGreenGuesses += guessWord[i]
        } else {
          newGuessWordColours += "Y"
          newYellowGuesses += guessWord[i]
        }
      } else {
        newGuessWordColours += "R"
        newRedGuesses += guessWord[i]
      }
    }

    if (guessCount === 1) {
      setFirstGuessWordColours(newGuessWordColours)
    } else if (guessCount === 2) {
      setSecondGuessWordColours(newGuessWordColours)
    } else if (guessCount === 3) {
      setThirdGuessWordColours(newGuessWordColours)
    } else if (guessCount === 4) {
      setFourthGuessWordColours(newGuessWordColours)
    } else if (guessCount === 5) {
      setFifthGuessWordColours(newGuessWordColours)
    } else if (guessCount === 6) {
      setSixthGuessWordColours(newGuessWordColours)
    } 

    setRedGuesses(redGuesses + newRedGuesses)
    setYellowGuesses(yellowGuesses + newYellowGuesses)
    setGreenGuesses(greenGuesses + newGreenGuesses)

    if (guessWord === mysteryWord) {
      gameWon = true
    }

    guessCount++

    if (guessCount === 7) {
      gameOver = true
    }
  }

  useEffect(() => {
    if (guessCount === 1) {
      setFirstGuess(guessWord)
    } else if (guessCount === 2) {
      setSecondGuess(guessWord)
    } else if (guessCount === 3) {
      setThirdGuess(guessWord)
    } else if (guessCount === 4) {
      setFourthGuess(guessWord)
    } else if (guessCount === 5) {
      setFifthGuess(guessWord)
    } else if (guessCount === 6) {
      setSixthGuess(guessWord)
    } 
  }, [guessWord])

  var gameStatus = "Nick"
  if (gameWon) {
    gameStatus = "Win"
  } else if (gameOver) {
    gameStatus = "Lose"
  }

  return (
    <div className="App">
      <div>
        <span className={`text-5xl ${gameStatus === "Lose" ? "text-red-500" : "text-lime-500"}`}>{gameStatus}</span><span className="text-5xl text-white">le</span>
      </div>

      <div className="LetterGrid my-5">
        <LetterRow letterColours={firstGuessWordColours} guess={firstGuess}/>
        <LetterRow letterColours={secondGuessWordColours} guess={secondGuess}/>
        <LetterRow letterColours={thirdGuessWordColours} guess={thirdGuess}/>
        <LetterRow letterColours={fourthGuessWordColours} guess={fourthGuess}/>
        <LetterRow letterColours={fifthGuessWordColours} guess={fifthGuess}/>
        <LetterRow letterColours={sixthGuessWordColours} guess={sixthGuess}/>
      </div>
        
      <div className={(gameOver || gameWon) ? `hidden` : ""}>     
         <Keyboard onWordChange={handleWordChange} guesses={{redLetters: redGuesses, yellowLetters: yellowGuesses, greenLetters: greenGuesses}}/>
      </div>  

      <div className={(gameOver || gameWon) ? "" : `hidden`}>  
        <button className="rounded-md text-5xl text-white bg-slate-500 p-5" onClick={window.location.reload.bind(window.location)}>Try Again?</button>
      </div>

    </div>
  );
}

export default App;