import LetterBox from "./LetterBox";

function LetterRow(props) {
    var guessWord = props.guess

    return (
        <div className="flex flex-auto">
            <LetterBox letter={guessWord.length > 0 ? guessWord[0] : "" }/>
            <LetterBox letter={guessWord.length > 1 ? guessWord[1] : "" }/>
            <LetterBox letter={guessWord.length > 2 ? guessWord[2] : "" }/>
            <LetterBox letter={guessWord.length > 3 ? guessWord[3] : "" }/>
            <LetterBox letter={guessWord.length > 4 ? guessWord[4] : "" }/>
            <LetterBox letter={guessWord.length > 5 ? guessWord[5] : "" }/>
        </div>
    );
}

export default LetterRow;