import React from "react";

const NoContent = ({ message }) => {
  return (
    <div className="center">
      <h2 className="no-posts">{message}</h2>
    </div>
  );
};

export default NoContent;
