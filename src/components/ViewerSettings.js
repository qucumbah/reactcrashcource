import React from 'react';

class ViewerSettings extends React.Component {
  state = {
    wordsHidden: this.props.settings.wordsHidden,
    translationsHidden: this.props.settings.translationsHidden,
  }

  onWordVisibilityChange = e => {
    const wordsHidden = e.target.checked;
    this.setState({ wordsHidden });
    this.props.onSettingsChange("wordsHidden", wordsHidden);
  }

  onTranslationVisibilityChange = e => {
    const translationsHidden = e.target.checked;
    this.setState({ translationsHidden });
    this.props.onSettingsChange("translationsHidden", translationsHidden);
  }

  render() {
    return (
      <div className="viewerSettings">
        <label htmlFor="hideWords">
          <input
            id="hideWords"
            type="checkbox"
            checked={this.state.wordsHidden}
            onChange={this.onWordVisibilityChange}
          />
          <span>Hide words</span>
        </label>
        <label htmlFor="hideTranslations">
          <input
            id="hideTranslations"
            type="checkbox"
            checked={this.state.translationsHidden}
            onChange={this.onTranslationVisibilityChange}
          />
          <span>Hide translations</span>
        </label>
      </div>
    )
  }
}

export default ViewerSettings;
