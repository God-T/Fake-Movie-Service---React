import React, { Component } from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <p> Movie Form: {match.params.id}</p>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
