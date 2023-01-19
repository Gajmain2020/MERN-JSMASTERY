import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  configureStore,
  applyMiddleware,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
