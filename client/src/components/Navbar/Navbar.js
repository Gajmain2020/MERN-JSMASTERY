import React from "react";
import { Link } from "react-router-dom";

import memories from "../../Images/memories.png";

import "./nav-styles.css";

function Navbar() {
  const user = null;
  return (
    <>
      <div className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a className="nav-heading" href="/">
              Memories <img className="image" src={memories} alt="A Memories" />
            </a>
          </div>

          {user ? (
            <div className="profile">
              <p className="avatar" src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </p>
              <p className="userName">{user.result.name}</p>
              <button className="logout">Logout</button>
            </div>
          ) : (
            <div>
              <a className="btn signin-btn btn-primary btn-sm" href="/auth">
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
