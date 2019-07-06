import React from 'react';
import Menu from './components/Menu.js';
import SetEditor from './components/SetEditor.js';
import Viewer from './components/Viewer.js';
import Exercise from './components/Exercise.js';
import Settings from './components/Settings.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';

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

    settings: {
      wordsHidden: false,
      translationsHidden: false,
      instantRemoval: false,
      languageTo: "en",
      languageFrom: "en"
    }
  }

  menuItems = [
    {
      name: "",
      iconName: "burger",
      onClick: ()=>this.toggleMenu(),
    },
    {
      name: "All sets",
      iconName: "list",
      onClick: ()=>this.setPage("viewer"),
    },
    {
      name: "Exercise",
      iconName: "exercise",
      onClick: ()=>this.setPage("exercise"),
    },
    {
      name: "Settings",
      iconName: "settings",
      onClick: ()=>this.setPage("settings"),
    },
  ]

  setPreset = {
    words: [],
    progress: 1,
    id: -1,
  }

  constructor(props) {
    super(props);
    const savedState = localStorage.getItem("appState");
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

    console.log(this.state);

    this.setState(newState);

    console.log(this.state);
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

  onSettingsChange = (key, value) => {
    const newSettings = this.state.settings;
    newSettings[key] = value;

    this.setState({
      settings: newSettings
    });
  }

  componentWillMount = () => {
    const initialState = Object.assign({}, this.state.settings);;

    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "SETTINGSCHANGE":
          this.onSettingsChange(action.key, action.value);
        default:
          return Object.assign({}, this.state.settings);
      }
    }

    this.store = createStore(reducer);
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
      <Provider store={this.store}>
        <div className="app">
          <div className="menuPlaceholder" />
          <Menu
            items={this.menuItems}
            open={this.state.menuOpen}
            toggle={this.toggleMenu}
          />
          {page}
        </div>
      </Provider>
    );
    return result;
  }
}

export default App;
