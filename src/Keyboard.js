import KeyboardButton from "./KeyboardButton";

function Keyboard(props) {
    return (
      <div className="Keyboard">
        <div className="row">
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="Q"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="W"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="E"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="R"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="T"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="Y"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="U"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="I"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="O"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="P"/>
        </div>

        <div className="row">
          <div className="spacer half"></div>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="A"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="S"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="D"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="F"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="G"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="H"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="J"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="K"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="L"/>
          <div className="spacer half"></div>
        </div>

        <div className="row">
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="enter"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="Z"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="X"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="C"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="V"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="B"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="N"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="M"/>
          <KeyboardButton onWordChange={props.onWordChange} guesses={props.guesses} letter="del"/>
        </div>
      </div>
    );
}

export default Keyboard;