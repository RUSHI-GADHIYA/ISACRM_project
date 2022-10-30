import { createContext, useContext } from "react";

// used createContext to create a context object
// context is used to share data between components
// so our auth can be used in any component
// context API documentation: https://reactjs.org/docs/context.html#reactcreatecontext
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  role: "",
  email: "",
  name: "",
  login: (response) => {},
  logout: () => {},
});

// used useContext to get the context object
// useContext API documentation: https://reactjs.org/docs/hooks-reference.html#usecontext
export const useAuth = () => {
  return useContext(AuthContext);
};
