import React from 'react';

class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      translation: "",
    };
  }

  addWord() {
    this.props.onWordAdd(
      {word: this.state.word, userTranslation: this.state.translation}
    );
  }

  handleAddition = () => {
    this.addWord(this.state.word, this.state.translation);
    this.setState({
      word: "",
      translation: "",
    });
  }

  handleWordChange = e => {
    this.setState({
      word: e.target.value,
    });
  }
  handleTranslationChange = e => {
    this.setState({
      translation: e.target.value,
    });
  }

  render() {
    let word = <input
      type="text"
      onChange={this.handleWordChange}
      value={this.state.word}
      className="wordInput__word"
    />;
    let translation = <input
      type="text"
      onChange={this.handleTranslationChange}
      value={this.state.translation}
      className="wordInput__translation"
    />;

    return (
      <div className="wordInput">
        {word}
        {translation}
        <button onClick={this.handleAddition}>Add</button>
      </div>
    );
  }
}

export default WordInput;
