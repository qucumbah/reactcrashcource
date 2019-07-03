import React from 'react';
import Menu from './components/Menu.js';
import SetEditor from './components/SetEditor.js';
import Viewer from './components/Viewer.js';
import Exercise from './components/Exercise.js';
import Settings from './components/Settings.js';
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

    curSet: 0,
    menuOpen: false,
    page: "viewer",

    viewerSettings: {
      wordsHidden: false,
      translationsHidden: false,
    },

    settings: {
      instantRemoval: false,
    }
  }

  menuItems = [
    {
      name: "",
      //imgPath: "img/outline-menu-24px.svg",
      iconName: "burger",
      onClick: ()=>this.toggleMenu(),
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
    },
    {
      name: "Settings",
      //imgPath: "img/outline-class-24px.svg",
      iconName: "settings",
      onClick: ()=>this.setPage("settings"),
    }
  ]

  setPreset = {
    words: [],
    progress: 1,
    id: -1,
  }

  constructor(props) {
    super(props);
    //const savedState = localStorage.getItem("appState");
    const savedState = false;
    if (savedState) {
      this.state = JSON.parse(localStorage.getItem("appState"));
    }
    window.onbeforeunload = () => {
      localStorage.setItem("appState", JSON.stringify(this.state));
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  setPage = page => {
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

    switch (action) {
      case "removal":
        newSet.words.splice(index, 1);
      break;
      case "addition":
        const i = newSet.words.findIndex(word => {
          return word.word===newWord && word.translation===newTranslation;
        });

        // Handle errors when we implement warning system
        if (i!==-1) {
          return;
        } else if (newWord==='' && newTranslation==='') {
          return;
        }

        newSet.words.push({
          word: newWord,
          translation: newTranslation,
        });
      break;
      case "edition":
        newSet.words[index] = {
          word: newWord,
          translation: newTranslation,
        };
      break;
      default:
        throw new Error("Unknown set change action");
    }

    this.setState(newState);
  }

  addWord = word => {
    const i = this.state.sets[this.state.curSet].words.findIndex(w => {
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

  handleSetAddition = (initialWord, initialTranslation) => {
    this.setState(newState => {
      let newSet = JSON.parse(JSON.stringify(this.setPreset));
      newSet.words.push(
        {
          word: initialWord,
          translation: initialTranslation
        }
      );

      newSet.id = newState.nextId++;

      newState.sets.push(newSet);
      return newState;
    });
  }

  render() {
    let page;
    switch (this.state.page) {
      case "editor":
        page = (
          <SetEditor
            set={this.state.sets.find(set=>set.id===this.state.curSet)}
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
            onSetAddition={this.handleSetAddition}
          />
        );
      break;
      case "exercise":
        page = (
          <Exercise />
        );
      break;
      case "settings":
        page = (
          <Settings />
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
          items={this.menuItems}
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
