import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="darken" onClick={this.toggle} />
        {this.props.children}
      </div>
    )
  }
}

export default Modal;
