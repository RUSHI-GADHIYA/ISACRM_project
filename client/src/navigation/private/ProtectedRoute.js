import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/auth/AuthContext";

// This is a component that ensures that the user is logged in
// This will check if the user is logged in or not
// If the user is not logged in, it will redirect the user to the login page
// If the user is logged in, it will render the children of this component
const ProtectedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  // useLocation is a hook provided by react-router-dom
  // useLocation API documentation: https://v5.reactrouter.com/web/api/Hooks/uselocation
  let location = useLocation();

  if (!authContext.isLoggedIn) {
    // if the user is not logged in, redirect the user to the login page
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  // if the user is logged in, render the children of this component
  return children;
};

export default ProtectedRoute;
