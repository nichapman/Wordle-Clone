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
      console.log("WINNER")
    }

    guessCount++

    if (guessCount === 7) {
      console.log("GAME OVER")
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

  return (
    <div className="App">
      <div className="LetterGrid my-5">
        <LetterRow letterColours={firstGuessWordColours} guess={firstGuess}/>
        <LetterRow letterColours={secondGuessWordColours} guess={secondGuess}/>
        <LetterRow letterColours={thirdGuessWordColours} guess={thirdGuess}/>
        <LetterRow letterColours={fourthGuessWordColours} guess={fourthGuess}/>
        <LetterRow letterColours={fifthGuessWordColours} guess={fifthGuess}/>
        <LetterRow letterColours={sixthGuessWordColours} guess={sixthGuess}/>
      </div>
        
      <Keyboard onWordChange={handleWordChange} guesses={{redLetters: redGuesses, yellowLetters: yellowGuesses, greenLetters: greenGuesses}}/>
    </div>
  );
}

export default App;