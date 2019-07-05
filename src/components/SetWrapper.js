import React from 'react';
import Set from './Set.js';
//import WordInput from './WordInput.js';
import Word from './Word.js';
import Button from './Button.js';

class SetWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "none",
    };
  }

  setProcess = process => {
    this.setState({process});
  }

  handleSetChange = (word, translation) => {
    this.props.onSetChange(
      this.props.set.id,
      "addition",
      0,
      word,
      translation
    );
  }

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

    let buttons;
    //OK: ()=>this.props.onSetRemoval(this.props.set.id)
    switch (this.state.process) {
      case "none":
        buttons = (
          <Button
            iconName="remove"
            onClick={()=>this.setProcess("removal")}
          />
        );
      break;
      case "removal":
        buttons = [
          (<Button
            key="yes"
            iconName="yes"
            onClick={()=>this.props.onSetRemoval(this.props.set.id)}
          />),
          (<Button
            key="no"
            iconName="no"
            onClick={()=>this.setProcess("none")}
          />)
        ];
      break;
      default:
        buttons = <div>Something went wrong</div>;
    }

    return (
      <div className="setWrapper">
        <div className="upperPanel">
          <div className="progressBar">
            {progressItems}
            <span>{this.props.set.progress}/10</span>
          </div>
          <div className="buttons">
            {buttons}
          </div>
        </div>
        <Set set={this.props.set} onSetChange={this.props.onSetChange} />
        <Word
          onEdition={this.handleSetChange}
          word=""
          translation=""
          inputOnly={true}
        />
      </div>
    )
    /* old word input
    <WordInput
      set={this.props.set}
      onSetChange={this.props.onSetChange}
    />
    */
  }
}

export default SetWrapper;
