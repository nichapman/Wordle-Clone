import LetterBox from "./LetterBox";
import './LetterRow.css';

function LetterRow() {
    return (
        <div className="LetterRow">
            <LetterBox />
            <LetterBox />
            <LetterBox />
            <LetterBox />
            <LetterBox />
            <LetterBox />
        </div>
    );
}

export default LetterRow;