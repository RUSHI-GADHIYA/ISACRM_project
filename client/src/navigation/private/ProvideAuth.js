import React from "react";
import setup from "../../api/apiInterceptor";
import { AuthContext } from "../../providers/auth/AuthContext";
import { useProvideAuth } from "../../providers/auth/UseProvideAuth";

// This ProvideAuth is a wrapper component that provides the AuthContext to its children
// This will be used to wrap the whole app so that all components can access the AuthContext
export const ProvideAuth = ({ children }) => {
  // This is the hook that we will use to retrive the context object
  const auth = useProvideAuth();
  // Pass the context object to the children
  setup(auth.logout);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
