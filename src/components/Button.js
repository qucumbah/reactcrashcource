import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.icons = {
      "burger": "outline-menu-24px.svg",
      "edit": "outline-edit-24px.svg",
      "list": "outline-view_list-24px.svg",
      "exercise": "outline-class-24px.svg",
      "yes": "outline-check_circle_outline-24px.svg",
      "no": "outline-highlight_off-24px.svg",
      "remove": "outline-delete-24px.svg",
      "settings": "outline-settings-24px.svg",
      "translate": "baseline-translate-24px.svg",
      "login": "outline-person-24px.svg",
      "register": "outline-person_add-24px.svg",
    }
  }

  render() {
    const imgPath = this.icons[this.props.iconName];

    return (
      <div className="button" onClick={this.props.onClick}>
        <img src={"img/"+imgPath} alt={this.props.alt} name={this.props.iconName} />
      </div>
    )
  }
}

export default Button;
