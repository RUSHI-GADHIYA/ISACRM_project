import React from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../config/constants";
import SideBar from "../components/Sidebar";
import { useAuth } from "../providers/auth/AuthContext";

const SideNav = ({ logo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [searchParams] = useSearchParams();

  const withProfileSideBar = [
    ROUTES.STUDENT_NOTES,
    ROUTES.STUDENT_PROFILE,
    ROUTES.STUDENT_DOCS,
    ROUTES.ADD_NOTE,
  ];

  return (
    <div className="w-64 h-screen justify-between border-r sideNav">
      <div className="px-8">
        <div className="h-16 w-full flex items-center my-14">
          <img className="" src={logo} alt="Logo"></img>
        </div>
        {withProfileSideBar.filter(item => location.pathname.includes(item)).length > 0 ? (
          <SideBar id={searchParams.get('id')}></SideBar>
        ) : (
          <ul className="mt-12">
            <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? "text-blue-600" : "text-black";
                }}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 pr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="text-sm  ml-2">Dashboard</span>
                </div>
              </NavLink>
            </li>
            {auth.role === "superAdmin" && (
              <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
                <NavLink
                  to="/admin"
                  className={({ isActive }) => {
                    return isActive ? "text-blue-600" : "text-black";
                  }}
                >
                  <div
                    className="flex items-center"
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 pr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>

                    <span className="text-sm  ml-2">Administration</span>
                  </div>
                </NavLink>
              </li>
            )}
            <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
              <NavLink
                to="/email"
                className={({ isActive }) => {
                  return isActive ? "text-blue-600" : "text-black";
                }}
              >
                <div
                  className="flex items-center"
                  onClick={() => {
                    navigate("/email");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 pr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <span className="text-sm  ml-2">Email Campaign</span>
                </div>
              </NavLink>
            </li>

            <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
              <NavLink
                to={ROUTES.ADD_STUDENT}
                className={({ isActive }) => {
                  return isActive ? "text-blue-600" : "text-black";
                }}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-sm  ml-2">Add Student</span>
                </div>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideNav;
