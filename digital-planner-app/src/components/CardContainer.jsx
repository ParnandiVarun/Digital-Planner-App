import React from "react";
import "../styles/components.css";

const CardContainer = ({ title, children }) => {
  return (
    <div className="card-container">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default CardContainer;
