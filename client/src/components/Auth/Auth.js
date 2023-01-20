import React, { useState } from "react";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";

import "./auth-styles.css";
import "bootstrap/dist/css/bootstrap.css";

import Input from "./Input";

const Auth = () => {
  //   const state = null;

  const isSignUp = true;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <Container component="main">
      <Paper elevation={3}>
        <Avatar>
          <div>Icon</div>
        </Avatar>
        <Typography varient="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <button type="submit" varient="contained" className="btn btn-primary">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
