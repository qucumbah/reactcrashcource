import React from 'react';
import Set from './Set.js';

class SetWrapper extends React.Component {
  render() {
    return (
      <div className="setWrapper">
        <div className="upperPanel">
          
        </div>
        <Set set={this.props.set} onSetChange={this.props.onSetChange} />
      </div>
    )
  }
}

export default SetWrapper;
