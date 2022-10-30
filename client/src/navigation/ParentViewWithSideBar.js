import React from "react";
import SideNav from "./SideNav";
import logo from "../assets/images/logo.png";

import { useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";
import { ROUTES } from "../config/constants";

// FUNCTION TO DISPLAY SIDE NAVIGATION BAR AND HEADER CONTAINING USER AND PAGE INFORMATION
function ParentViewWithSideBar(props) {
  const location = useLocation();
  const withOutNavbar = [
    ROUTES.SIGN_IN,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ];

  const withoutSideBar = [
    ROUTES.SIGN_IN,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ];

  return (
    <div className="flex">
      {!withOutNavbar.includes(location.pathname) && (
        <SideNav logo={logo}></SideNav>
      )}

      <div className="w-full flex flex-col h-screen">
        {!withoutSideBar.includes(location.pathname) && (
          <div className="px-12 py-6">
            <UserHeader></UserHeader>
          </div>
        )}

        {props.children}
      </div>
    </div>
  );
}

export default ParentViewWithSideBar;
