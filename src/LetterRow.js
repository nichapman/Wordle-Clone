import LetterBox from "./LetterBox";

function LetterRow() {
    return (
        <div className="flex flex-auto">
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