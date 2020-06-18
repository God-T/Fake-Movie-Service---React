import React from "react";

const Like = ({ liked, onLike }) => {
  let classN = "fa fa-heart";
  if (liked) classN += "-o";

  return <i onClick={onLike} className={classN} aria-hidden="true"></i>;
};

export default Like;
