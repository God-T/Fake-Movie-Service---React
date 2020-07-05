import React, { Component } from "react";
import InputForm from "./inputForm";
import Joi from "@hapi/joi";
import Select from "./select";

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
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //handling errors
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  doSubmit = () => {
    console.log("submit");
  };

  handleChange = ({ currentTarget: input }) => {
    //error check
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    //update
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label, ...rest) => {
    return (
      <button
        type="submit"
        disabled={this.validate()}
        className="btn btn-primary"
        {...rest}
      >
        {label}
      </button>
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <InputForm
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
