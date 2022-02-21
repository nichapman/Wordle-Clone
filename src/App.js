import './App.css'
import LetterRow from './LetterRow'
import Keyboard from './Keyboard'
import {useEffect, useState} from 'react'
import wordList from './six-letter-words'

// BUGS:
// - letter on keyboard doesn't change from yellow to green after being guessed
//  if second instance of letter doesn't exist in word, set to green else keep yellow
// - duplicate letter guesses often show one yellow one green when only one instance of letter in mystery word

var mysteryWord = generateWord().toUpperCase()
var guessCount = 1
var gameOver = false
var gameWon = false

function generateWord() {
  //generate based on half of the day for fixed word between users
  let i = Math.floor(Math.random() * wordList.words.length);
  return wordList.words[i]
}

function App() {
  const [guessWord, setGuessWord] = useState("")

  const [redGuesses, setRedGuesses] = useState("")
  const [yellowGuesses, setYellowGuesses] = useState("")
  const [greenGuesses, setGreenGuesses] = useState("")

  const [guessColours, setGuessColours] = useState(["", "", "", "", "", ""])
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""])
 
  function updateGuessesObjects(index, guess, setObject) {
    const newGuesses = [...guesses];
    newGuesses[index] = guess;
    setObject(newGuesses);
  }

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

  async function wordExists(guessWord) {
    const response = await fetch(`https://api.wordnik.com/v4/word.json/${guessWord.toLowerCase()}/scrabbleScore?api_key=${process.env.REACT_APP_KEY}`)
    const body = await response.json()
    if (!body.value) {
      alert("Word not valid")
      updateGuessesObjects(guessCount-1, "", setGuesses)
      return false
    }
    return true
  }

  async function evaluateGuess(guessWord) {
    if (process.env.NODE_ENV === "development") {
      if (!(await wordExists(guessWord))) return 
    }

    let newGreenGuesses = ""
    let newYellowGuesses = ""
    let newRedGuesses = ""
    let newGuessColours = ""
    let guessArray = Array.from(guessWord)

    for (let i = 0; i < guessArray.length; i++) { 
      let letter = guessArray[i]
      if (mysteryWord.includes(letter)) {
        if (mysteryWord[i] === guessArray[i]) {
          newGuessColours += "G"
          newGreenGuesses += guessWord[i]
        } else {
          newGuessColours += "Y"
          newYellowGuesses += guessWord[i]
        }
      } else {
        newGuessColours += "R"
        newRedGuesses += guessWord[i]
      }
    }

    if (guessCount <= 6) {
      updateGuessesObjects(guessCount-1, newGuessColours, setGuessColours)
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
    if (guessCount <= 6 && guessWord !== "") {
      updateGuessesObjects(guessCount-1, guessWord, setGuesses)
    }
  }, [guessWord])

  var gameStatus = "Nick"
  if (gameWon) {
    gameStatus = "Win"
  } else if (gameOver) {
    gameStatus = "Lose"
  }

  function getShareString() {
    return openShareDialog({text: `${getDate()}\n\n${guessColours.map(it => convertColourStringToEmojis(it)).join("").slice(0, -1)}`})
  }

  function convertColourStringToEmojis(colourString) {
    if (colourString === undefined || colourString.length === 0) return ""
    return Array.from(colourString).map(it => letterToEmoji(it)).join("") + "\n"
  }

  function letterToEmoji(letter) {
    switch(letter) {
      case "R":
        return "🟥"
      case "Y":
        return "🟨"
      case "G":
        return "🟩"
      default: 
        return
    }
  }

  function getDate() {
    const date = new Date()
    let hours = date.getHours()
    let dateString = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}${nth(date.getDate())} ${gameWon ? `Winle ${guessCount - 1}/6` : "Losele"}` 
    return (hours >= 0 && hours < 12) ? `Early ${dateString}`: `Late ${dateString}`
  }

  function nth(n){return ["st","nd","rd"][(((n<0?-n:n)+90)%100-10)%10-1]||"th"}

  const openShareDialog = str => {
    if (navigator && navigator.share)
      return navigator.share(str)
    return Promise.reject('The Share API is not available.');
  };

  return (
    <div className="App">
      <div>
        <span className={`text-5xl ${gameStatus === "Lose" ? "text-red-500" : "text-lime-500"}`}>{gameStatus}</span><span className="text-5xl text-white">le</span>
      </div>

      <div className="LetterGrid my-5">
        {guesses.map((it, index) => <LetterRow key={index} letterColours={guessColours[index]} guess={it}/>)}
      </div>
        
      <div className={(gameOver || gameWon) ? "hidden" : ""}>     
         <Keyboard onWordChange={handleWordChange} guesses={{redLetters: redGuesses, yellowLetters: yellowGuesses, greenLetters: greenGuesses}}/>
      </div>  

      <div className={(gameOver || gameWon) ? "" : "hidden"}>  
        <button className="rounded-md text-4xl text-white bg-slate-500 p-2" onClick={getShareString}>Share</button>
      </div>
    </div>
  );
}

export default App;