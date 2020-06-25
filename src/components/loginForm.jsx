import React, { Component } from "react";
import Input from "./common/input";
import Joi from "@hapi/joi";
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

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //handle Joi validation
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.account,
      options
    );
    if (!error) return null;
    //destruct error message from Joi
    const errors = {};
    error.details.map((item) => {
      errors[item.path[0]] = item.message;
    });
    // console.log(errors);
    return errors;
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

  //validate property by runtime typing
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    // console.log({ [name]: this.schema[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    //error check
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    //update account
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
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
