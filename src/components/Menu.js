import React from 'react';
import MenuItem from './MenuItem.js';

class Menu extends React.Component {
  state = {
    open: false,
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const burgerButton = (
      <MenuItem
        onClick={this.toggle}
        iconName="burger"
        name=""
      />
    );
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
    const signin = (
      <MenuItem
        onClick={this.handleRegister}
        iconName="register"
        name="sign in"
      />
    );
    const login = (
      <MenuItem
        onClick={this.handleLogin}
        iconName="login"
        name="log in"
      />
    );

    return (
      <div className={"menu "+(this.state.open?"menu--open":"menu--closed")}>
        <div className="darken" onClick={this.toggle} />
        {burgerButton}
        <img className="logo__mobile" src="img/logo.png" alt="" />
        <div className="container">
          <div className="left" onClick={this.toggle}>
            <img className="logo__desktop" src="img/logo.png" alt="" />
            {menuItems}
          </div>
          <div className="right" onClick={this.toggle}>
            {signin}
            {login}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
