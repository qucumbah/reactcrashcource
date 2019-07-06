import React from 'react';

import { connect } from 'react-redux';

class Translation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: props.word,
      currentTimeout: null,
      translations: null,
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
      this.setState({ translations: null });
      return;
    }

    const request = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190703T152027Z.ac8f9778b27e6d81.d993e2f02394b2ca2f02cef87e4de691fd45fbde&lang=${this.props.settings.languageFrom}-${this.props.settings.languageTo}&text=`+this.state.word);
    //const request = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190703T152027Z.ac8f9778b27e6d81.d993e2f02394b2ca2f02cef87e4de691fd45fbde&lang=en-en&text=`+this.state.word);
    const obj = await request.json();

    console.log(obj);

    this.setState({ translations: obj.def });
  }

  componentDidMount() {
    this.updateTranslation();
  }

  //pos = part of speech
  render() {
    let partsOfSpeech;
    if (this.state.translations) {
      partsOfSpeech = this.state.translations.map(pos => {
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
    } else {

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
