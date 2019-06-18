import React from 'react';
import ViewerSettings from './ViewerSettings.js';
import SetWrapper from './SetWrapper.js';

class Viewer extends React.Component {
  render() {
    let setWrappers = this.props.sets.map(set => {
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
    });

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
          {setWrappers}
        </div>
      </div>
    )
  }
}

export default Viewer;
