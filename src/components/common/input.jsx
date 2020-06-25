import React from "react";

const Input = ({ name, label, value, onChange }) => {
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
    </div>
  );
};

export default Input;
