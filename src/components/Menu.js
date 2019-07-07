import React from 'react';
import MenuItem from './MenuItem.js';

class Menu extends React.Component {
  toggle = () => {
    if (this.props.open) {
      this.props.toggle();
    }
  }

  render() {
    const menuItems = this.props.items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          onClick={item.onClick}
          iconName={item.iconName}
          name={item.name}
        />
      );
    });
    const login = (
      <div className="right">
        <MenuItem
          onClick={this.handleRegister}
          iconName="register"
          name="register"
        />
        <MenuItem
          onClick={this.handleLogin}
          iconName="login"
          name="log in"
        />
      </div>
    );

    return (
      <div className={"menu "+(this.props.open?"menu--open":"menu--closed")}>
        <div className="darken" onClick={this.toggle} />
        <div className="container">
          <div className="left">
            {menuItems}
          </div>
          {login}
        </div>
      </div>
    );
  }
}

export default Menu;
