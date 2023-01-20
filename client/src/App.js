import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

//    ADDING NAVBAR COMPONENT
import Navbar from "./components/Navbar/Navbar";

//    ADDING Auth COMPONENT
import Auth from "./components/Auth/Auth";

//    ADDING HOME COMPONENTS
import Home from "./components/Home/Home";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

//ADDING STYLES TO THE REACT APP USING MATERIAL UI
// import useStyles from "./styles";

const App = () => {
  // const classes = useStyles();

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
