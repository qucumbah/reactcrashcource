import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = React.createRef();
    this.password = React.createRef();

    this.state = {
      errorMessages: []
    }
  }

  onSubmit = async () => {
    const user = {
      login: this.login.current.value,
      password: this.password.current.value
    };

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    const result = await response.json();

    if (result.code===200) {
      this.props.onLogin();
    } else {
      this.setState({ errorMessages: result.errorMessages });
    }
  }

  render() {
    let errors;
    if (this.state.errorMessages) {
      errors = this.state.errorMessages.map(msg => {
        return (
          <div key={msg}>{msg}</div>
        );
      });
    }

    return (
      <div className="modalForm login">
        <div className="upper">
          <div className="title">Log in</div>
          <div className="cross" onClick={this.props.onToggle} />
        </div>
        <div className="form">
          <input
            placeholder="Login"
            type="text"
            ref={this.login}
          />
          <input
            placeholder="Password"
            type="password"
            ref={this.password}
          />
          <div className="errors">{errors}</div>
          <input
            type="submit"
            value="Submit"
            onClick={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

export default Login;
