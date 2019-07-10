import React from 'react';
import { connect } from 'react-redux';

class ViewerSettings extends React.Component {
  onWordVisibilityChange = e => {
    const wordsHidden = e.target.checked;
    //this.props.onSettingsChange("wordsHidden", wordsHidden);
    this.props.dispatch({
      type: "SETTINGSCHANGE",
      key: "wordsHidden",
      value: wordsHidden
    });
  }

  onTranslationVisibilityChange = e => {
    const translationsHidden = e.target.checked;
    //this.props.onSettingsChange("translationsHidden", translationsHidden);
    this.props.dispatch({
      type: "SETTINGSCHANGE",
      key: "translationsHidden",
      value: translationsHidden
    });
  }

  render() {
    return (
      <div className="viewerSettings">
        <div className="title">Viewer settings</div>
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

const mapStateToProps = state => ({
  settings: state
});

export default connect(mapStateToProps)(ViewerSettings);
