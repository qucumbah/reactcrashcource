import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.icons = {
      "burger": "img/outline-menu-24px.svg",
      "edit": "img/outline-edit-24px.svg",
      "list": "img/outline-view_list-24px.svg",
      "exercise": "img/outline-class-24px.svg",
      "yes": "img/outline-check_circle_outline-24px.svg",
      "no": "img/outline-highlight_off-24px.svg",
      "remove": "img/outline-delete-24px.svg",
    }
  }

  render() {
    let imgPath = this.icons[this.props.iconName];

    return (
      <div className="button" onClick={this.props.onClick}>
        <img src={imgPath} alt={this.props.alt} name={this.props.iconName} />
      </div>
    )
  }
}

export default Button;
