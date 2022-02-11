import './App.css'
import randomWords from 'random-word-by-length'
import LetterRow from './LetterRow'
import Keyboard from './Keyboard'
import {useState} from 'react'

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
  const [word, setWord] = useState("")
  //make guesses sets?
  const [redGuesses, setRedGuesses] = useState("")
  const [yellowGuesses, setYellowGuesses] = useState("")
  const [greenGuesses, setGreenGuesses] = useState("")
 
  function handleWordChange(letter) {
    if (letter.length === 1) {
      if (word.length === 6) { return }
      setWord(word + letter)
    } else if (letter === "del") {
      setWord(word.slice(0, -1))
    } else {
      if (word.length < 6) { return }
      evaluateGuess(word)
      setWord("")
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
    console.log(redGuesses)
    setYellowGuesses(yellowGuesses + newYellowGuesses)
    console.log(yellowGuesses)
    setGreenGuesses(greenGuesses + newGreenGuesses)
    console.log(greenGuesses)
  }

  return (
    <div className="App">
      <div className="text-white text-3xl">mystery: {mysteryWord}</div>
      <div className="text-white text-3xl">guess: {word}</div>

      <div className="LetterGrid my-5">
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
      </div>
        
      <Keyboard onWordChange={handleWordChange} guesses={{redLetters: redGuesses, yellowLetters: yellowGuesses, greenLetters: greenGuesses}}/>
    </div>
  );
}

export default App;