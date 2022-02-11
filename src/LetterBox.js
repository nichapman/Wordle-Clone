function LetterBox(props) {

    var letterColour
    if (props.letterColour === "R") {
        letterColour = "bg-red-500"
    } else if (props.letterColour === "Y") {
        letterColour = "bg-yellow-500"
    } else if (props.letterColour === "G") {
        letterColour = "bg-green-500"
    }

    return (
        <div className={`text-white border-2 border-solid border-white p-3 m-1 ${letterColour}`}>{props.letter}</div>
    );
}

export default LetterBox;