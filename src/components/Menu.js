import React from 'react';
import Button from './Button.js';

class Menu extends React.Component {
  toggle = () => {
    if (this.props.open) {
      this.props.toggle();
    }
  }

  render() {
    let menuItems = this.props.items.map((item, index) => {
      return (
        <div key={index} onClick={item.onClick} className="menuItem">
          <Button iconName={item.iconName} alt={item.name} />
          <span>{item.name}</span>
        </div>
      );
    });

    return (
      <div className={"menu "+(this.props.open?"menu--open":"menu--closed")}>
        <div className="darken" onClick={this.toggle} />
        <div className="left">
          {menuItems}
        </div>
      </div>
    );
  }
}

export default Menu;
