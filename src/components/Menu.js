import React from 'react';

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
          <div className="imageContainer">
            <img src={item.imgPath} alt={item.name} />
          </div>
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
