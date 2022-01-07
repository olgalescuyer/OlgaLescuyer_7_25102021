import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
  TimeAgo.addLocale(fr)
);
