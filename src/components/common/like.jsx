import React from "react";

const Like = ({ liked, onLikeChange }) => {
  let classN = "fa fa-heart";
  if (!liked) classN += "-o";
  return <i onClick={onLikeChange} className={classN} aria-hidden="true"></i>;
};

export default Like;
