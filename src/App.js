import './App.css'
import randomWords from 'random-word-by-length'
import LetterRow from './LetterRow'
import Keyboard from './Keyboard'
import {useEffect, useState} from 'react'

var mysteryWord = generateWord().toUpperCase()
var guessCount = 1

function generateWord() {
  var word = ""
  do {
    word = randomWords(6)
  } while (word.length !== 6)
  return word
}

function App() {
  const [guessWord, setGuessWord] = useState("")

  const [redGuesses, setRedGuesses] = useState("")
  const [yellowGuesses, setYellowGuesses] = useState("")
  const [greenGuesses, setGreenGuesses] = useState("")
  
  const [firstGuess, setFirstGuess] = useState("")
  const [secondGuess, setSecondGuess] = useState("")
  const [thirdGuess, setThirdGuess] = useState("")
  const [fourthGuess, setFourthGuess] = useState("")
  const [fifthGuess, setFifthGuess] = useState("")
  const [sixthGuess, setSixthGuess] = useState("")
 
  function handleWordChange(letter) {
    if (letter.length === 1) {
      if (guessWord.length === 6) { return }
      setGuessWord(guessWord + letter)
    } else if (letter === "del") {
      setGuessWord(guessWord.slice(0, -1))
    } else if (letter === "enter") {
      if (guessWord.length < 6) { return }
      evaluateGuess(guessWord)
      setGuessWord("")
    }
  }

  function evaluateGuess(guessWord) {
    //check if word in dictionary first?
    
    let newGreenGuesses = ""
    let newYellowGuesses = ""
    let newRedGuesses = ""
    let guessArray = Array.from(guessWord)

    for (let i = 0; i < guessArray.length; i++) { 
      let letter = guessArray[i]
      if (mysteryWord.includes(letter)) {
        if (mysteryWord[i] === guessArray[i]) {
          newGreenGuesses += guessWord[i]
        } else {
          newYellowGuesses += guessWord[i]
        }
      } else {
        newRedGuesses += guessWord[i]
      }
    }

    setRedGuesses(redGuesses + newRedGuesses)
    setYellowGuesses(yellowGuesses + newYellowGuesses)
    setGreenGuesses(greenGuesses + newGreenGuesses)

    guessCount++
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

  return (
    <div className="App">
      {/* <div className="text-white text-3xl">mystery: {mysteryWord}</div> */}

      <div className="LetterGrid my-5">
        <LetterRow guess={firstGuess}/>
        <LetterRow guess={secondGuess}/>
        <LetterRow guess={thirdGuess}/>
        <LetterRow guess={fourthGuess}/>
        <LetterRow guess={fifthGuess}/>
        <LetterRow guess={sixthGuess}/>
      </div>
        
      <Keyboard onWordChange={handleWordChange} guesses={{redLetters: redGuesses, yellowLetters: yellowGuesses, greenLetters: greenGuesses}}/>
    </div>
  );
}

export default App;