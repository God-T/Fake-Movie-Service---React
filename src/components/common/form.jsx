import React, { Component } from "react";
import Input from "./input";
import Joi from "@hapi/joi";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };
  //handle Joi validation
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.data,
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
  //validate property by runtime typing
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    // console.log({ [name]: this.schema[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSumbit = (event) => {
    event.preventDefault();

    //handling errors
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  renderButton = (label) => {
    return (
      <button
        type="submit"
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
