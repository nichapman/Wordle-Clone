import './App.css';
import randomWords from 'random-word-by-length';
import LetterRow from './LetterRow';
import Keyboard from './Keyboard';

function App() {
  var word = generateWord();
 
  return (
    <div className="App">
      <div classsName="LetterGrid">
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
      </div>

      <div className="Keyboard">
        <Keyboard />
      </div>
    </div>
  );
}

function generateWord() {
  var word = "";
  do {
    word = randomWords(6)
  } while (word.length !== 6)
  return word;
}

function evaluateGuess() {

}

export default App;