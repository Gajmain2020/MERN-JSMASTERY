import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  // Routes,
  Redirect,
} from "react-router-dom";

//    ADDING NAVBAR COMPONENT
import Navbar from "./components/Navbar/Navbar";

//    ADDING Auth COMPONENT
import Auth from "./components/Auth/Auth";

import PostDetails from "./components/PostDetails/PostDetails";

//    ADDING HOME COMPONENTS
import Home from "./components/Home/Home";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import { Container } from "@mui/material";

//ADDING STYLES TO THE REACT APP USING MATERIAL UI
// import useStyles from "./styles";

const App = () => {
  // const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
