import React from 'react';
import Button from './Button.js';
import Translation from './Translation.js';

class Word extends React.Component {
  constructor(props) {
    super();
    this.state = {
      process: props.inputOnly?"edition":"none",
      tempWord: props.word,
      tempTranslation: props.translation,
      sliderOpen: false
    };
  }

  setProcess = process => {
    if (this.props.inputOnly) {
      return;
    }
    this.setState({ process });
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
    this.setProcess("none");
    //reset inputs to initial values
    this.setState({
      tempWord: this.props.word,
      tempTranslation: this.props.translation,
    });
  }
  applyEdition = () => {
    this.setProcess("none");
    this.props.onEdition(this.state.tempWord, this.state.tempTranslation);
    if (this.props.inputOnly) {
      this.setState({
        tempWord: "",
        tempTranslation: "",
      });
    }
  }

  toggleSlider = () => {
    this.setState({
      sliderOpen: !this.state.sliderOpen
    });
  }

  render() {
    const translationSlider = (!this.state.sliderOpen)?null:(
      <Translation
        key={this.props.word+this.props.translation}
        word={this.props.word}
      />
    );

    switch (this.state.process) {
      case "none":
        return (
          <div className="word word--noprocess">
            <Button
              iconName="translate"
              onClick={()=>this.toggleSlider()}
            />
            <div className="word__word">
                {this.props.word}
            </div>
            <div className="word__translation">
              {this.props.translation}
            </div>
            <Button iconName="edit" onClick={()=>this.setProcess("edition")} />
            <Button iconName="remove" onClick={()=>this.setProcess("removal")} />
            {translationSlider}
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
            <Button
              iconName="translate"
              onClick={()=>this.toggleSlider()}
            />
            {wordInput}
            {translationInput}
            <Button iconName="yes" onClick={this.applyEdition} />
            <Button iconName="no" onClick={this.cancelEdition} />
            {translationSlider}
          </div>
        );
      case "removal":
        return (
          <div className="word word--removal">
            <Button
              iconName="translate"
              onClick={()=>this.toggleSlider()}
            />
            <div style={{gridColumn: "span 2"}}>
              Are you sure you want to delete the word {this.props.word}?
            </div>
            <Button iconName="yes" onClick={()=>this.props.onRemoval()} />
            <Button iconName="no" onClick={()=>this.setProcess("none")} />
            {translationSlider}
          </div>
        );
      default:
        return <div>Something went wrong</div>;
    }
  }
}

export default Word;
