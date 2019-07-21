import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.login = React.createRef();
    this.email = React.createRef();
    this.password1 = React.createRef();
    this.password2 = React.createRef();

    this.state = {
      errorMessages: []
    }
  }

  onSubmit = async () => {
    const user = {
      login: this.login.current.value,
      email: this.email.current.value,
      password1: this.password1.current.value,
      password2: this.password2.current.value
    };

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    const result = await response.json();

    if (result.code===200) {
      this.props.onSignup();
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
          <div className="title">Sign up</div>
          <div className="cross" onClick={this.props.onToggle} />
        </div>
        <div className="form">
          <input
            placeholder="Login"
            type="text"
            ref={this.login}
          />
          <input
            placeholder="Email"
            type="email"
            ref={this.email}
          />
          <input
            placeholder="Password"
            type="password"
            ref={this.password1}
          />
          <input
            placeholder="Repeat password"
            type="password"
            ref={this.password2}
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

export default Signup;
