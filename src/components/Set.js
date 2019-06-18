import React from 'react';
import Word from './Word.js';

class Set extends React.Component {
  handleWordEdition = (index, newWord, newTranslation) => {
    this.props.onSetChange("edition", index, newWord, newTranslation);
  }
  handleWordRemoval = (index) => {
    this.props.onSetChange("removal", index);
  }

  render() {
    let words = this.props.set.words.map((wordObject, index)=>{
      let word = wordObject.word;
      let translation = wordObject.userTranslation;
      return (
        <Word
          word={word}
          translation={translation}
          key={word+translation}
          onEdition={(...args)=>this.handleWordEdition(index, ...args)}
          onRemoval={()=>this.handleWordRemoval(index)}
        />
      );
    });
    return (
      <div className="set">{words}</div>
    );
  }
}

export default Set;
