import React from "react";
import { CheckIcon, LoadingIcon } from "./Icons";
// ANIMATED LOADING BUTTON COMPONENT
const LoadingButton = ({
  isLoading,
  title,
  loadingTitle,
  onClick,
  icon,
  fontSize = "text-sm",
  width = "w-full",
  ...props
}) => {
  return (
    <button
      disabled={isLoading}
      className={`${width} h-10 bg-blue-500 text-white active:bg-blue-800 ${fontSize} px-6 py-2 rounded shadow hover:shadow-lg hover:bg-blue-700 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 inline-flex items-center justify-center`}
      type="button"
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <LoadingIcon />
          {loadingTitle}
        </>
      ) : (
        <>
          <div className="mr-3">{icon ?? <></>}</div>
          {title}
        </>
      )}
    </button>
  );
};

export { LoadingButton };
