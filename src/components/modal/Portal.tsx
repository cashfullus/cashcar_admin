import React from "react";
import ReactDOM from "react-dom";

const Portal: React.FC = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el!);
};

export default Portal;
