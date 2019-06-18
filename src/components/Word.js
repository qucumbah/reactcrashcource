import React from 'react';

class Word extends React.Component {
  constructor(props) {
    super();
    this.state = {
      process: "none",
      tempWord: props.word,
      tempTranslation: props.translation,
    };
  }

  setProcess(process) {
    this.setState({process});
  }

  handleWordEdition(e) {
    this.setState({
      tempWord: e.target.value
    });
  }
  handleTranslationEdition(e) {
    this.setState({
      tempTranslation: e.target.value
    });
  }

  cancelEdition() {
    this.setState({
      process: "none",
      tempWord: this.props.word,
      tempTranslation: this.props.translation,
    });
  }
  applyEdition() {
    this.setProcess("none");
    this.props.onEdition(this.state.tempWord, this.state.tempTranslation);
  }

  render() {
    switch (this.state.process) {
      case "none":
        return (
          <div className="word">
            <div>{this.props.word}</div>
            <div>{this.props.translation}</div>
            <div className="edit" onClick={()=>this.setProcess("edition")}>P</div>
            <div className="no" onClick={()=>this.setProcess("removal")}>X</div>
          </div>
        );
      case "edition":
        let wordInput = (
          <input
            value={this.state.tempWord}
            onChange={e=>this.handleWordEdition(e)}
          />);
        let translationInput = (
          <input
            value={this.state.tempTranslation}
            onChange={e=>this.handleTranslationEdition(e)}
          />);
        return (
          <div className="word word--edition">
            {wordInput}
            {translationInput}
            <div className="yes" onClick={()=>this.applyEdition()}>V</div>
            <div className="no" onClick={()=>this.cancelEdition()}>X</div>
          </div>
        );
      case "removal":
        return (
          <div className="word word--removal">
            <div>{this.props.word}</div>
            <div>{this.props.translation}</div>
            <div style={{gridColumn: "span 2"}} />
            <div style={{gridColumn: "span 2"}}>
              Are you sure you want to delete this word?
            </div>
            <div className="yes" onClick={()=>this.props.onRemoval()}>V</div>
            <div className="no" onClick={()=>this.setProcess("none")}>X</div>
          </div>
        );
      default:
        return null;
    }
  }
}

export default Word;
