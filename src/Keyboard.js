function Keyboard() {
    return (
      <div className="Keyboard">
        <div className="row">
          <button className="button" data-key="q">Q</button>
          <button data-key="w">W</button>
          <button data-key="e">E</button>
          <button data-key="r">R</button>
          <button data-key="t">T</button>
          <button data-key="y">Y</button>
          <button data-key="u">U</button>
          <button data-key="i">I</button>
          <button data-key="o">O</button>
          <button data-key="p">P</button>
        </div>

        <div className="row">
          <div className="spacer half"></div>
          <button data-key="a">A</button>
          <button data-key="s">S</button>
          <button data-key="d">D</button>
          <button data-key="f">F</button>
          <button data-key="g">G</button>
          <button data-key="h">H</button>
          <button data-key="j">J</button>
          <button data-key="k">K</button>
          <button data-key="l">L</button>
          <div className="spacer half"></div>
        </div>

        <div className="row">
          <button data-key="↵" className="one-and-a-half">enter</button>
          <button data-key="z">Z</button>
          <button data-key="x">X</button>
          <button data-key="c">C</button>
          <button data-key="v">V</button>
          <button data-key="b">B</button>
          <button data-key="n">N</button>
          <button data-key="m">M</button>
          <button data-key="←" className="one-and-a-half">del</button>
        </div>
      </div>
    );
}

export default Keyboard;