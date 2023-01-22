import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Alert,
} from "@mui/material";

import "./auth-styles.css";
import "bootstrap/dist/css/bootstrap.css";

import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  //   const state = null;
  const history = useHistory();
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      setIsValid(dispatch(signup(formData, history)));
      console.log(isValid);
    } else {
      setIsValid(dispatch(signin(formData, history)));
      console.log(isValid);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main">
      <Paper elevation={5}>
        <div className="main-container">
          <Avatar>
            <div>Icon</div>
          </Avatar>
          <Typography varient="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <div className="form2">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
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
                {isValid && (
                  <Alert className="alert" severity="error">
                    Password Does Not Match !! Please re-enter !!
                  </Alert>
                )}
                {isSignup && (
                  <Input
                    name="confirmPassword"
                    label="Repeat Password"
                    handleChange={handleChange}
                    type="password"
                  />
                )}
              </Grid>

              <div className="submit-btn">
                <button type="submit" className="btn btn-primary">
                  {isSignup ? "Sign Up" : "Sign In"}
                </button>
              </div>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignup
                      ? "Already have an account? Sign In "
                      : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default SignUp;
