import React from "react";
import Toast from "./Toast";
import ReactDOM from "react-dom";

//DISPLAY TOAST ON SCREEN
const ToastContainer = ({ toasts }) => {
  return ReactDOM.createPortal(
    <div className="absolute z-1 top-10 right-10">
      {toasts.map((value) => (
        <Toast key={value.id} id={value.id} type={value.type}>
          {value.content}
        </Toast>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
