// src/context/AuthProvider.jsx
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
  const initialUserData = () => {
    const storedUser = localStorage.getItem("user-new");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          email: "",
          password: "",
          favourites: { rooms: [] },
          userExists: false,
        };
  };

  const [userInfo, setUserInfo] = useState(initialUserData);
  const [openLoginWindow, setOpenLoginWindow] = useState(false);

  useEffect(() => {
    localStorage.setItem("user-new", JSON.stringify(userInfo));
  }, [userInfo]);

  const isUserStoredInLocalStorage = (user) => {
    const retrievedUserInfo = JSON.parse(localStorage.getItem("user-new"));
    return (
      retrievedUserInfo?.email === user.email &&
      retrievedUserInfo?.password === user.password
    );
  };

  const handleLogin = (inputValues) => {
    if (isUserStoredInLocalStorage(inputValues)) {
      setUserInfo((prev) => ({ ...prev, userExists: true }));
    } else {
      alert("user not registered");
    }
  };

  const createAccount = (inputValues) => {
    if (!isUserStoredInLocalStorage(inputValues)) {
      setUserInfo((prev) => ({
        ...prev,
        email: inputValues.email,
        password: inputValues.password,
        userExists: true,
      }));
      alert("account created");
    } else alert("user is already registered");
  };

  const logOut = () => {
    setUserInfo((prev) => {
      const updatedUserInfo = { ...prev, userExists: false };
      return updatedUserInfo;
    });
    window.location.reload();
  };

  const toggleLoginWindow = () => {
    setOpenLoginWindow(!openLoginWindow);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        openLoginWindow,
        handleLogin,
        createAccount,
        toggleLoginWindow,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
