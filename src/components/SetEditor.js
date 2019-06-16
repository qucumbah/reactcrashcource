import React from 'react';
import Set from './Set.js';
import WordInput from './WordInput.js';

class SetEditor extends React.Component {
  render() {
    return (
      <div className="setEditor">
        <WordInput onWordAdd={word=>this.props.onWordAdd(word)} />
        <Set set={this.props.set} onSetChange={this.props.onSetChange} />
      </div>
    );
  }
}

export default SetEditor;
