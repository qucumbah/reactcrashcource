import React from 'react';
import Set from './Set.js';
import WordInput from './WordInput.js';
import Button from './Button.js';

class SetWrapper extends React.Component {
  render() {
    let progressItems = [];

    for (let i = 1;i<=10;i++) {
      progressItems.push(
        <div
          className={i<=this.props.set.progress?"checked":"unchecked"}
          key={i}
          onClick={()=>this.props.onProgressChange(this.props.set.id, i)}
        />
      );
    }

    return (
      <div className="setWrapper">
        <div className="upperPanel">
          <div className="progressBar">
            {progressItems}
            <span>{this.props.set.progress}/10</span>
          </div>
          <div className="buttons">
            <Button
              iconName="edit"
              onClick={()=>this.props.onSetEditorOpen(this.props.set.id)}
            />
            <Button
              iconName="remove"
              onClick={()=>this.props.onSetRemoval(this.props.set.id)}
            />
          </div>
        </div>
        <Set set={this.props.set} onSetChange={this.props.onSetChange} />
        <WordInput
          set={this.props.set}
          onSetChange={this.props.onSetChange}
        />
      </div>
    )
  }
}

export default SetWrapper;
