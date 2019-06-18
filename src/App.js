import React from 'react';
import Menu from './components/Menu.js';
import SetEditor from './components/SetEditor.js';
import Viewer from './components/Viewer.js';
import Exercise from './components/Exercise.js';
import './App.css';

// import TestComponent from './components/TestComponent.js';

class App extends React.Component {
  state = {
    sets: [
      {
        words: [
          {word: "fetch", translation: "=get"},
          {word: "master", translation: "=main"},
          {word: "toungue", translation: "=language"},
          {word: "word", translation: "=letters"},
        ],
        progress: 3,
        id: 0,
      },
      {
        words: [
          {word: "awa", translation: "=gewwet"},
          {word: "wwe", translation: "=ww"},
          {word: "s", translation: "=aa"},
        ],
        progress: 2,
        id: 1,
      }
    ],
    nextId: 2,

    menuItems: [
      {
        name: "",
        //imgPath: "img/outline-menu-24px.svg",
        iconName: "burger",
        onClick: ()=>this.toggleMenu(),
      },
      {
        name: "Set editor",
        //imgPath: "img/outline-edit-24px.svg",
        iconName: "edit",
        onClick: ()=>this.setPage("editor"),
      },
      {
        name: "All sets",
        //imgPath: "img/outline-view_list-24px.svg",
        iconName: "list",
        onClick: ()=>this.setPage("viewer"),
      },
      {
        name: "Exercise",
        //imgPath: "img/outline-class-24px.svg",
        iconName: "exercise",
        onClick: ()=>this.setPage("exercise"),
      }
    ],

    curSet: 0,
    menuOpen: false,
    page: "editor",

    viewerSettings: {
      wordsHidden: false,
      translationsHidden: false,
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  setPage(page) {
    if (this.state.menuOpen) {
      this.toggleMenu();
    }
    this.setState({
      page,
    });
  }

  handleSetChange = (setId, action, index, newWord, newTranslation) => {
    let newState = this.state;
    let newSet = newState.sets.find(set => {
      return set.id===setId;
    });

    if (!newSet) {
      throw new Error(); // Handle error when we implement warning system
    }

    if (action==="removal") {
      newSet.words.splice(index, 1);
      this.setState(newState);
    } else if (action==="edition") {
      newSet.words[index] = {
        word: newWord,
        translation: newTranslation,
      };
      this.setState(newState);
    }
  }

  addWord(word) {
    let i = this.state.sets[this.state.curSet].words.findIndex(w => {
      return w.word===word.word && w.translation===word.translation;
    });
    if (i!==-1) {
      // Handle error when we implement warning system
      return;
    }

    let newState = this.state;
    newState.sets[this.state.curSet].words.push(word);
    this.setState(newState);
  }

  changeViewerSettings = newSettings => {
    this.setState({
      viewerSettings: newSettings,
    });
  }

  handleProgressChange = (setId, newProgress) => {
    let newState = this.state;
    let newSet = newState.sets.find(set => {
      return set.id===setId;
    });

    if (!newSet) {
      throw new Error(); // Handle error when we implement warning system
    }

    newSet.progress = newProgress;
    this.setState(newState);
  }

  handleSetEditorOpen = setId => {
    this.setState({ curSet: setId });
    this.setPage("editor");
  }

  handleSetRemoval = setId => {
    console.log("awaw");
    let newState = this.state;
    let newSetIndex = newState.sets.findIndex(set => {
      return set.id===setId;
    });

    if (newSetIndex===-1) {
      throw new Error(); // Handle error when we implement warning system
    }

    newState.sets.splice(newSetIndex, 1);

    this.setState(newState);
  }

  render() {
    let page;
    switch (this.state.page) {
      case "editor":
        page = (
          <SetEditor
            set={this.state.sets[this.state.curSet]}
            onWordAdd={word=>this.addWord(word)}
            onSetChange={this.handleSetChange}
          />
        );
      break;
      case "viewer":
        page = (
          <Viewer
            sets={this.state.sets}
            settings={this.state.viewerSettings}
            onSettingsChange={this.changeViewerSettings}
            onSetChange={this.handleSetChange}
            onProgressChange={this.handleProgressChange}
            onSetEditorOpen={this.handleSetEditorOpen}
            onSetRemoval={this.handleSetRemoval}
          />
        );
      break;
      case "exercise":
        page = (
          <Exercise />
        );
      break;
      default:
        page = (
          <div>Something went wrong</div>
        );
      break;
    }

    let result = (
      <div className="app">
        <div className="menuPlaceholder" />
        <Menu
          items={this.state.menuItems}
          open={this.state.menuOpen}
          toggle={this.toggleMenu}
        />
        {page}
      </div>
    );
    return result;
  }
}

export default App;
