import React from 'react';

class Translation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: props.word,
      currentTimeout: null,
    }
  }

  handleEdition = e => {
    e.persist();
    this.setState(state => {
      clearTimeout(state.currentTimeout);
      const newTimeout = setTimeout(this.updateTranslation, 1000);
      return {
        word: e.target.value,
        currentTimeout: newTimeout,
      };
    });
  }

  updateTranslation = () => {
    const request = fetch("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190703T152027Z.ac8f9778b27e6d81.d993e2f02394b2ca2f02cef87e4de691fd45fbde&lang=en-ru&text="+this.props.word);

    request.then(result => console.log(result.json().then(console.log)));
  }

  render() {
    return (
      <div className="translation">
        <input
          value={this.state.word}
          onChange={this.handleEdition}
        />
        <p>{this.state.translationText}</p>
      </div>
    );
  }
}

export default Translation;
