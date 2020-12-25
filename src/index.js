import React from "react";
import ReactDOM from "react-dom";
import App from "./client/components/App";
import NavbarHeader from "./client/components/NavbarHeader";


ReactDOM.render(
  <div>
    <NavbarHeader />,
    <App/>,
  </div>,
 
  document.getElementById("root")
);
