import React from 'react';

class Modal extends React.Component {
  render() {
    const className =
        "modal"+(this.props.open?" modal--open":" modal--closed");

    return (
      <div className={className}>
        <div className="darken" onClick={this.props.onToggle} />
        <div className="content">
          {this.props.content}
        </div>
      </div>
    )
  }
}

export default Modal;
