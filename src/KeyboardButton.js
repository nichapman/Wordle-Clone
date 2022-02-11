function KeyboardButton(props) {
    var isRed = false
    var isYellow = false
    var isGreen = false

    function handleButtonClick() {
        props.onWordChange(props.letter)
    }

    function getBackgroundColour() {
        if (isRed) {
            return "bg-red-500"
        } else if (isYellow) {
            return "bg-yellow-500"
        } else if (isGreen) {
            return "bg-green-500"
        } else {
            return "bg-slate-500"
        }
    }

    if (props.guesses.redLetters.includes(props.letter)) {
        isRed = true
    } else if (props.guesses.yellowLetters.includes(props.letter)) {
        isYellow = true
    } else if (props.guesses.greenLetters.includes(props.letter)) {
        isGreen = true
    }

    var keyWidth
    if (props.letter !== "enter" && props.letter !== "del") {
        keyWidth = "w-7"
    }

    return (
        <button className={`text-2xl text-white m-1 p-1 ${getBackgroundColour()} ${keyWidth}`} onClick={handleButtonClick}>{props.letter}</button>
    );
}

export default KeyboardButton;