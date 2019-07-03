import React from 'react';
import Button from './Button.js';

class Word extends React.Component {
  constructor(props) {
    super();
    this.state = {
      process: "none",
      tempWord: props.word,
      tempTranslation: props.translation,
      sliderOpen: false
    };
  }

  setProcess = process => {
    this.setState({process});
  }

  handleWordEdition = e => {
    this.setState({
      tempWord: e.target.value
    });
  }
  handleTranslationEdition = e => {
    this.setState({
      tempTranslation: e.target.value
    });
  }

  cancelEdition = () => {
    this.setState({
      process: "none",
      tempWord: this.props.word,
      tempTranslation: this.props.translation,
    });
  }
  applyEdition = () => {
    this.setProcess("none");
    this.props.onEdition(this.state.tempWord, this.state.tempTranslation);
  }

  toggleSlider = () => {
    this.setState({
      sliderOpen: !this.state.sliderOpen
    });
  }

  render() {
    switch (this.state.process) {
      case "none":
        return (
          <div className="word">
            <div className="word__word" onClick={this.toggleSlider}>
                {this.props.word}
            </div>
            <div className="word__translation" onClick={this.toggleSlider}>
              {this.props.translation}
            </div>
            <Button iconName="edit" onClick={()=>this.setProcess("edition")} />
            <Button iconName="remove" onClick={()=>this.setProcess("removal")} />
          </div>
        );
      case "edition":
        let wordInput = (
          <input
            value={this.state.tempWord}
            onChange={this.handleWordEdition}
          />);
        let translationInput = (
          <input
            value={this.state.tempTranslation}
            onChange={this.handleTranslationEdition}
          />);
        return (
          <div className="word word--edition">
            {wordInput}
            {translationInput}
            <Button iconName="yes" onClick={this.applyEdition} />
            <Button iconName="no" onClick={this.cancelEdition} />
          </div>
        );
      case "removal":
        return (
          <div className="word word--removal">
            <div style={{gridColumn: "span 2"}}>
              Are you sure you want to delete the word {this.props.word}?
            </div>
            <Button iconName="yes" onClick={()=>this.props.onRemoval()} />
            <Button iconName="no" onClick={()=>this.setProcess("none")} />
          </div>
        );
      default:
        return <div>Something went wrong</div>;
    }
  }
}

export default Word;
