import React from "react";

const Like = ({ liked, movie, onLikeChange }) => {
  let classN = "fa fa-heart";
  if (!liked) classN += "-o";
  return (
    <i
      onClick={() => onLikeChange(movie)}
      className={classN}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
