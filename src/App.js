import React from 'react';
import Menu from './components/Menu.js';
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
        nChecked: 0,
      }
    ],

    menuItems: [
      {
        name: "",
        imgPath: "img/burger.png",
        onClick: ()=>this.toggleMenu(),
      },
      {
        name: "Set editor",
        imgPath: "img/pencil.png",
        onClick: ()=>this.setPage("setEditor"),
      },
      {
        name: "All sets",
        imgPath: "img/list.png",
        onClick: ()=>this.setPage("setViewer"),
      },
      {
        name: "Exercise",
        imgPath: "img/book.png",
        onClick: ()=>this.setPage("setChecker"),
      }
    ],

    menuOpen: false,
  }

  addWord(word) {
    let newState = this.state;
    newState.sets[0].words.push(word);
    this.setState(newState);
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
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
      <div className="app">
        <div className="menuPlaceholder" />
        <Menu
          items={this.state.menuItems}
          open={this.state.menuOpen}
          toggle={this.toggleMenu}
        />
        <SetEditor
          set={this.state.sets[0]}
          onWordAdd={word=>this.addWord(word)}
          onSetChange={this.handleSetChange}
        />
      </div>
    );
    return result;
  }
}

export default App;
