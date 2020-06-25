import React, { Component } from "react";

class LoginForm extends Component {
  //Refs
  //username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  state = {
    account: { username: "", password: "" },
  };

  handleSumbit = (event) => {
    event.preventDefault();
    //call the server
    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.handleSumbit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              //   ref={this.username}
              autoFocus
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={account.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={account.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="save ps" />
            <label className="form-check-label" htmlFor="save ps">
              Save the passwords
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
