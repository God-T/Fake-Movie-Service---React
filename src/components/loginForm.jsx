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
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "") errors.username = "Username required";
    if (account.password.trim() === "") errors.password = "Password required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSumbit = (event) => {
    event.preventDefault();

    //handling errors
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //call the server
    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.handleSumbit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            error={errors.password}
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
