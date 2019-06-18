import React from 'react';

class ViewerSettings extends React.Component {
  onWordVisibilityChange = e => {
    let translationsHidden = this.props.settings.translationsHidden;
    let wordsHidden = e.target.checked;
    this.props.onSettingsChange(
      {wordsHidden, translationsHidden}
    );
  }

  onTranslationVisibilityChange = e => {
    let translationsHidden = e.target.checked;
    let wordsHidden = this.props.settings.wordsHidden;
    this.props.onSettingsChange(
      {wordsHidden, translationsHidden}
    );
  }

  render() {
    return (
      <div className="viewerSettings">
        <label htmlFor="hideWords">
          <input
            id="hideWords"
            type="checkbox"
            checked={this.props.settings.wordsHidden}
            onChange={this.onWordVisibilityChange}
          />
          <span>Hide words</span>
        </label>
        <label htmlFor="hideTranslations">
          <input
            id="hideTranslations"
            type="checkbox"
            checked={this.props.settings.translationsHidden}
            onChange={this.onTranslationVisibilityChange}
          />
          <span>Hide translations</span>
        </label>
      </div>
    )
  }
}

export default ViewerSettings;
