import { useState } from "react";
import { decodeToken } from "react-jwt";

// This is the hook that we will use to emulate the context object
// This hook will return an object with the properties of auth context
// The properties of the object will be the values of the context object
export const useProvideAuth = () => {
  // When app loads, we want to set the auth state based on the local storage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") !== "" ? localStorage.getItem("userId") : ""
  );
  const [role, setRole] = useState(
    localStorage.getItem("role") !== "" ? localStorage.getItem("role") : ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") !== "" ? localStorage.getItem("email") : ""
  );
  const [name, setName] = useState(
    localStorage.getItem("name") !== "" ? localStorage.getItem("name") : ""
  );

  // This function will be called when we want user to login
  const login = (response) => {
    localStorage.setItem("login", true);
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("name", response.name);

    const myDecodedToken = decodeToken(response.accessToken);
    setUserId(myDecodedToken.id);
    setRole(myDecodedToken.role);
    setEmail(myDecodedToken.email);
    setName(response.name);
    localStorage.setItem("userId", myDecodedToken.id);
    localStorage.setItem("role", myDecodedToken.role);
    localStorage.setItem("email", myDecodedToken.email);
    setIsLoggedIn(true);
  };

  // This function will be called when we want user to logout
  const logout = () => {
    // clear localstorage
    localStorage.setItem("login", false);
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("role", "");
    localStorage.setItem("email", "");
    localStorage.setItem("name", "");

    // clear provider state
    setUserId("");
    setRole("");
    setEmail("");
    setName("");
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    userId,
    role,
    email,
    name,
    login,
    logout,
  };
};
