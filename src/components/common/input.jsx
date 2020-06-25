import React from "react";

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //   ref={this.username}
        autoFocus
        type="text"
        className="form-control"
        id={name}
        onChange={onChange}
        value={value}
        name={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
