import React from 'react';
import ViewerSettings from './ViewerSettings.js';
import SetWrapper from './SetWrapper.js';
import WordInput from './WordInput.js';

class Viewer extends React.Component {
  handleSetAddition = (setId, action, index, word, translation) => {
    this.props.onSetAddition(word, translation);
  }

  render() {
    const setWrappers = this.props.sets.map(set => {
      return (
        <SetWrapper
          set={set}
          key={set.id}
          onSetChange={this.props.onSetChange}
          onProgressChange={this.props.onProgressChange}
          onSetEditorOpen={this.props.onSetEditorOpen}
          onSetRemoval={this.props.onSetRemoval}
        />
      );
    }).reverse();

    const setCreator = (
      <WordInput
        set={{ id: -1 }} // Not needed, we will create new set with new id
        onSetChange={this.handleSetAddition}
      />
    );

    let className = "viewer";
    if (this.props.settings.wordsHidden) {
      className += " --hideWords";
    }
    if (this.props.settings.translationsHidden) {
      className += " --hideTranslations"
    }

    return (
      <div className={className}>
        <ViewerSettings
          onSettingsChange={this.props.onSettingsChange}
          settings={this.props.settings}
        />
        <div className="setWrappers">
          <div className="setWrapper newSetCreator">
            <div className="description">
              <span>Input a word to create new set</span>
            </div>
            {setCreator}
          </div>
          {setWrappers}
        </div>
      </div>
    )
  }
}

export default Viewer;
