import React from 'react';

import { connect } from 'react-redux';

class Translation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: props.word,
      currentTimeout: null,
      translations: {code: 0},
    }
  }

  handleEdition = e => {
    e.persist();
    this.setState(state => {
      clearTimeout(state.currentTimeout);
      const newTimeout = setTimeout(this.updateTranslation, 500);
      return {
        word: e.target.value,
        currentTimeout: newTimeout,
      };
    });
  }

  updateTranslation = async () => {
    if (!this.state.word) {
      this.setState({ translations: {code: 0} });
      return;
    }

    const url = `http://localhost:5000/translate?languageFrom=${this.props.settings.languageFrom}&languageTo=${this.props.settings.languageTo}&word=${this.state.word}`;

    const request = await fetch(url);
    const obj = await request.json();

    console.log(obj);

    this.setState({ translations: obj });
  }

  componentDidMount() {
    this.updateTranslation();
  }

  //pos = part of speech
  render() {
    let partsOfSpeech;

    //check for simple errors
    switch (this.state.translations.code) {
      case 0:
        partsOfSpeech = <div>...</div>;
      break;
      case 1:
        partsOfSpeech = <div>Unknown word</div>;
      break;
      case 200:
        partsOfSpeech = this.state.translations.def.map(pos => {
          const posName = pos.pos;
          const translations = pos.tr.map(translation => {
            const text = translation.text;
            return <span key={posName+text}>{text};</span>;
          })

          return (
            <div key={posName+this.props.word} className="partOfSpeech">
              <b>{posName}</b>: {translations}
            </div>
          );
        });
      break;
      case 402:
        partsOfSpeech = (
          <div>
            Dictionary API key is blocked<br />
            Make sure to get your own key
          </div>
        );
      break;
      case 501:
        partsOfSpeech = (
          <div>
            Sorry, this combination of languages is not supported<br />
            Please choose another combination
          </div>
        );
      break;
      default:
        partsOfSpeech = (
          <div>
            Something went wrong: <br />
            {this.state.translations.errorMessage}
          </div>
        );
    }

    return (
      <div className="translation">
        <input
          value={this.state.word}
          onChange={this.handleEdition}
        />
        {partsOfSpeech}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state
});

export default connect(mapStateToProps)(Translation);
