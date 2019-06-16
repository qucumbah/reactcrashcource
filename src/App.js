import React from 'react';
import SetEditor from './components/SetEditor.js';
import './App.css';

import TestComponent from './components/TestComponent.js';

class App extends React.Component {
  state = {
    sets: [
      {
        words: [
          {word: "fetch", userTranslation: "=get"},
          {word: "master", userTranslation: "=main"},
          {word: "toungue", userTranslation: "=language"},
          {word: "word", userTranslation: "=letters"},
        ],
        nChecked: 0
      }
    ]
  }

  addWord(word) {
    let newState = this.state;
    newState.sets[0].words.push(word);
    this.setState(newState);
  }

  handleSetChange = (action, index, newWord, newTranslation) => {
    if (action==="removal") {
      let newState = this.state;
      newState.sets[0].words.splice(index, 1);
      this.setState(newState);
    } else if (action==="edition") {
      let newState = this.state;
      newState.sets[0].words[index] = {
        word: newWord,
        userTranslation: newTranslation,
      };
      this.setState(newState);
    }
  }

  render() {
    let result = (
      <div className="App">
        <SetEditor set={this.state.sets[0]} onWordAdd={word=>this.addWord(word)} onSetChange={this.handleSetChange} />
        {/* <TestComponent /> */}
      </div>
    );
    return result;
  }
}

export default App;
