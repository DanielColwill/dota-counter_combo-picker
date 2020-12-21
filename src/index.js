import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import NavbarHeader from "./components/NavbarHeader";

ReactDOM.render(
  <div>
    <NavbarHeader />,
    <App/>
  </div>,
  document.getElementById("root")
);
