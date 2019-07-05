import React from 'react';
import Button from './Button.js';

class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      translation: "",
    };
  }

  addWord = () => {
    this.props.onSetChange(
      this.props.set.id,
      "addition",
      0,
      this.state.word,
      this.state.translation
    );
    this.clearInput();
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

  clearInput = () => {
    this.setState({
      word: "",
      translation: "",
    });
  }

  toggleSlider = () => {
    this.setState({
      sliderOpen: !this.state.sliderOpen
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
        <Button
          iconName="translate"
          onClick={()=>this.toggleSlider()}
        />
        {word}
        {translation}
        <Button iconName="yes" onClick={this.addWord} />
        <Button iconName="no" onClick={this.clearInput} />
      </div>
    );
  }
}

export default WordInput;
