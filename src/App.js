import './App.css'
import LetterRow from './LetterRow'
import Keyboard from './Keyboard'
import {useEffect, useState} from 'react'
import wordList from './six-letter-words'

// BUGS:
// - letter on keyboard doesn't change from yellow to green after being guessed
//  if second instance of letter doesn't exist in word, set to green else keep yellow
// - duplicate letter guesses often show one yellow one green when only one instance of letter in mystery word
//  

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

  const [firstGuessColours, setFirstGuessColours] = useState("")
  const [secondGuessColours, setSecondGuessColours] = useState("")
  const [thirdGuessColours, setThirdGuessColours] = useState("")
  const [fourthGuessColours, setFourthGuessColours] = useState("")
  const [fifthGuessColours, setFifthGuessColours] = useState("")
  const [sixthGuessColours, setSixthGuessColours] = useState("")

  const [firstGuess, setFirstGuess] = useState("")
  const [secondGuess, setSecondGuess] = useState("")
  const [thirdGuess, setThirdGuess] = useState("")
  const [fourthGuess, setFourthGuess] = useState("")
  const [fifthGuess, setFifthGuess] = useState("")
  const [sixthGuess, setSixthGuess] = useState("")

  let guessColours = [firstGuessColours, secondGuessColours, thirdGuessColours, fourthGuessColours, fifthGuessColours, sixthGuessColours]
  let guessColoursSetters = [setFirstGuessColours, setSecondGuessColours, setThirdGuessColours, setFourthGuessColours, setFifthGuessColours, setSixthGuessColours]
  let guesses = [firstGuess, secondGuess, thirdGuess, fourthGuess, fifthGuess, sixthGuess]
 
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
      guessColoursSetters[guessCount-1](newGuessColours)
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
    const guessSetters = [setFirstGuess, setSecondGuess, setThirdGuess, setFourthGuess, setFifthGuess, setSixthGuess]

    if (guessCount <= 6) {
      guessSetters[guessCount-1](guessWord)
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