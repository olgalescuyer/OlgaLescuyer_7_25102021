import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'

import fr from 'javascript-time-ago/locale/fr.json'
// import ru from 'javascript-time-ago/locale/ru.json'

import App from "./App.jsx";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
  TimeAgo.addDefaultLocale(fr)
);
