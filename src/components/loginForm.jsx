import React, { Component } from "react";
import Input from "./common/input";
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
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
          />
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
