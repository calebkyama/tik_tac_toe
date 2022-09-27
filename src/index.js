//the react code

import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";

// StrictMode is a React Developer Tool primarily
// used for highlighting possible problems in a web
// application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
