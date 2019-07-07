import React from 'react';
import Button from './Button.js';

class MenuItem extends React.Component {
  render() {
    /*
    let button;
    
    if (this.props.iconName) {
      button = (
        <Button
          iconName={this.props.iconName}
          alt={this.props.name}
        />
      );
    }
    */
    return (
      <div
        onClick={this.props.onClick}
        className="menuItem"
        id={"menuItem--"+this.props.iconName}
      >
        <Button
          iconName={this.props.iconName}
          alt={this.props.name}
        />
        <span className="name">{this.props.name}</span>
      </div>
    );
  }
}

export default MenuItem;
