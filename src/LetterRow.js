import LetterBox from "./LetterBox";

function LetterRow(props) {
    var guessWord = props.guess

    return (
        <div className="flex flex-auto">
            <LetterBox letterColour={props.letterColours[0]} letter={guessWord.length > 0 ? guessWord[0] : "" }/>
            <LetterBox letterColour={props.letterColours[1]} letter={guessWord.length > 1 ? guessWord[1] : "" }/>
            <LetterBox letterColour={props.letterColours[2]} letter={guessWord.length > 2 ? guessWord[2] : "" }/>
            <LetterBox letterColour={props.letterColours[3]} letter={guessWord.length > 3 ? guessWord[3] : "" }/>
            <LetterBox letterColour={props.letterColours[4]} letter={guessWord.length > 4 ? guessWord[4] : "" }/>
            <LetterBox letterColour={props.letterColours[5]} letter={guessWord.length > 5 ? guessWord[5] : "" }/>
        </div>
    );
}

export default LetterRow;