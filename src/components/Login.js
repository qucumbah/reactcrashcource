import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="modalForm signin">
        <div className="upper">
          <div className="title">Log in</div>
          <div className="cross" onClick={this.props.onToggle} />
        </div>
        <form method="post" action="/login">
          <input
            placeholder="Login"
            type="text"
            name="login"
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
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

export default Login;
