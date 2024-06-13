import React, { useState } from "react";
import { useAuth } from "../../context/authProvider";
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AuthForm.css";

const AuthForm = () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [isLoginForm, setIsLoginForm] = useState(true);

  const {
    handleLogin,
    createAccount,
    logOut,
    toggleLoginWindow,
    userInfo,
    openLoginWindow,
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.email && inputValues.password) {
      if (isLoginForm) {
        handleLogin(inputValues);
      } else {
        createAccount(inputValues);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const getUsernameFromEmail = (email) => {
    return email ? email.split("@")[0] : "";
  };

  const getWelcomeMessage = () => {
    if (userInfo?.userExists) {
      return `Welcome to Ikea, ${getUsernameFromEmail(userInfo?.email)}`;
    } else {
      return isLoginForm ? "Login to Ikea" : "Create account";
    }
  };

  return (
    <div>
      <Drawer anchor="right" open={openLoginWindow} onClose={toggleLoginWindow}>
        <Box className="auth-form-container">
          <Box className="auth-form-header">
            <Typography className="auth-form-title">
              {getWelcomeMessage()}
            </Typography>
            <IconButton onClick={toggleLoginWindow}>
              <CloseIcon />
            </IconButton>
          </Box>
          {!userInfo?.userExists ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="auth-form-body"
            >
              <TextField
                variant="outlined"
                value={inputValues.email}
                onChange={handleOnchange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                className="auth-form-field"
              />
              <TextField
                variant="outlined"
                value={inputValues.password}
                onChange={handleOnchange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="auth-form-field"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="auth-form-button"
              >
                {isLoginForm ? "Log in" : "Create account"}
              </Button>

              <Button
                className="auth-switch-form-text"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm
                  ? "You don't have an account? Create one"
                  : "Already have an account? Log in"}
              </Button>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="contained"
              className="auth-form-button"
              onClick={logOut}
            >
              Log out
            </Button>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

export default AuthForm;
