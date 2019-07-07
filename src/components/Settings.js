import React from 'react';

import { connect } from 'react-redux';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    //sometimes language code != country code; here languageCode=countryCode
    const languages = `
    be,ru,cs=cz,en=gb,de,
    tr,da=dk,el=gr,es,et,
    fi,fr,it,lt,lv,
    nl,no,pt,sk,sv,
    uk=ua,hu,bg,pl,tt
    `
    .replace(/[\n ]/g,'')
    .split(',');

    this.languages = languages.map(s => {
      const i = s.indexOf('=');

      //If we have "=", then language code != country code
      if (i!==-1) {
        return {
          name: s.slice(0, i), //Language name
          flag: s.slice(i+1), //Two-letter country code for this language
        }
      } else {
        return {
          name: s,
          flag: s,
        }
      }
    });
  }

  render() {
    const optionsFrom = this.languages.map(lang => {
      return (
        <div
          key={"from"+lang.name}
          className="option"
          onClick={()=>this.props.dispatch(
            {
              type: "SETTINGSCHANGE",
              key: "languageFrom",
              value: lang.name
            }
          )}
        >
          <img
            src={`https://www.countryflags.io/${lang.flag}/flat/64.png`}
            alt=""
          />
          <div className="languageName">{lang.name}</div>
        </div>
      );
    });
    const optionsTo = this.languages.map(lang => {
      return (
        <div
          key={"to"+lang.name}
          className="option"
          onClick={()=>this.props.dispatch(
            {
              type: "SETTINGSCHANGE",
              key: "languageTo",
              value: lang.name
            }
          )}
        >
          <img
            src={`https://www.countryflags.io/${lang.flag}/flat/64.png`}
            alt=""
          />
          <div className="languageName">{lang.name}</div>
        </div>
      );
    });

    return (
      <div className="settings">
        <label htmlFor="name">Checkbox</label>
        <input type="checkbox" id="name" />
        <div>Language you learn: {this.props.settings.languageFrom}</div>
        <div className="from">
          {optionsFrom}
        </div>
        <div>Language to translate to: {this.props.settings.languageTo}</div>
        <div>(set the same as you learn if you only want definitions)</div>
        <div className="to">
          {optionsTo}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state
});

export default connect(mapStateToProps)(Settings);
