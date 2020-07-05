import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      type="text"
      className="form-control my-3"
      placeholder="Searching..."
    />
  );
};

export default SearchBar;
