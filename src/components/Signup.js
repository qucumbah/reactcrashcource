import React from 'react';

class Signup extends React.Component {
  render() {
    return (
      <div className="modalForm signup">
        <div className="upper">
          <div className="title">Sign up</div>
          <div className="cross" onClick={this.props.onToggle} />
        </div>
        <form method="post" action="/signup">
          <input
            placeholder="Login"
            type="text"
            name="login"
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
          />
          <input
            placeholder="Password"
            type="password"
            name="password1"
          />
          <input
            placeholder="Repeat password"
            type="password"
            name="password2"
          />
          <input
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    )
  }
}

export default Signup;
