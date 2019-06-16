import React from 'react';

class WordInput extends React.Component {
  word = "";
  translation = "";

  addWord() {
    this.props.onWordAdd(
      {word: this.word, userTranslation: this.translation}
    );
  }

  render() {
    let word = <input type="text" onChange={(e)=>{this.word = e.target.value}} className="wordInput__word" />;
    let translation = <input type="text" onChange={(e)=>{this.translation = e.target.value}} className="wordInput__translation" />;

    return (
      <div className="wordInput">
        {word}
        {translation}
        <button onClick={()=>this.addWord(word.valueOf(),translation.valueOf())}>Add</button>
      </div>
    );
  }
}

export default WordInput;
