import React, { useState, useContext, useCallback } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = React.createContext(null);

let id = 1;
// CONTEXT FOR PROVIDING DATA TO TOAST COMPONENT
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (content, type) => {
      content = content.toString();
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          content,
          type,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => {
        return toasts.filter((t) => t.id !== id);
      });
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);
  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;

// CONTEXT DOCUMENTATION : https://reactjs.org/docs/context.html