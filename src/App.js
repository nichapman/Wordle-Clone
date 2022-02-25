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
 
  function updateGuessList(index, guess) {
    const newGuesses = [...guesses];
    newGuesses[index] = guess;
    setGuesses(newGuesses);
  }

  function updateColoursList(index, colours) {
    const newColours = [...guessColours];
    newColours[index] = colours;
    setGuessColours(newColours);
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
    }
  }

  async function evaluateGuess(guessWord) {
    let newGreenGuesses = ""
    let newYellowGuesses = ""
    let newRedGuesses = ""
    let newGuessColours = ""
    let guessArray = Array.from(guessWord)

    for (let i = 0; i < guessArray.length; i++) { 
      let letter = guessArray[i]
      if (mysteryWord.includes(letter)) { // && hasn't been guessed green 
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

    // for each letter in guess:
    //   if letter is in mystery word:
    //     if position of letter matches letter in mystery word: green
    //     else: yellow
    //   else: red

    // if letter only in word once but guess has two of letter: only have green for correct and red for other

    // keep a count of each letter in guess and it's occurrence in mystery word
    //  A R O M A S
    //  A R R O W S
    //
    //  A R R O W S
    //  2 1 1 1 0 1

    if (guessCount <= 6) {
      updateColoursList(guessCount-1, newGuessColours)
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

    setGuessWord("")
  }

  useEffect(() => {
    if (guessCount <= 6) {
      updateGuessList(guessCount-1, guessWord)
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