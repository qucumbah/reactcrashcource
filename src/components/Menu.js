import React from 'react';
import MenuItem from './MenuItem.js';

class Menu extends React.Component {
  state = {
    open: false,
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  }

  hide = () => {
    this.setState({ open: false });
  }

  getMenuItems = items => {
    const result = items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          onClick={item.onClick}
          iconName={item.iconName}
          name={item.name}
        />
      );
    });
    return result;
  }

  render() {
    const burgerButton = (
      <MenuItem
        onClick={this.toggle}
        iconName="burger"
        name=""
      />
    );
    const leftItems = this.getMenuItems(this.props.leftItems);
    const rightItems = this.getMenuItems(this.props.rightItems);

    return (
      <div className={"menu "+(this.state.open?"menu--open":"menu--closed")}>
        <div className="darken" onClick={this.toggle} />
        {burgerButton}
        <img className="logo__mobile" src="img/logo.png" alt="" />
        <div className="container">
          <div className="left" onClick={this.hide}>
            <img className="logo__desktop" src="img/logo.png" alt="" />
            {leftItems}
          </div>
          <div className="right" onClick={this.hide}>
            {rightItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
