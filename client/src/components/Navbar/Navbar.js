import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import memories from "../../Images/memories.png";

import * as actionType from "../../constants/actionTypes";

import "./nav-styles.css";
import { AppBar, Toolbar, Button } from "@mui/material";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar position="static" id="appBar">
      <div className="brandContainer">
        <Typography
          component={Link}
          to="/"
          className="heading"
          variant="h2"
          align="center"
        >
          Memories
          <img className="image" src={memories} alt="icon" height="60" />
        </Typography>
      </div>

      <Toolbar className="toolbar">
        {user?.result ? (
          <div className="profile">
            <Avatar
              className="purple"
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className="logout"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
