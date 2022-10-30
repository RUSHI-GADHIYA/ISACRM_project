import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "../providers/auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../config/constants";
import { getUserGreetingBasedOnTime } from "../utils/commonUtils";

const UserHeader = (props) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between">
        {location.pathname === ROUTES.DASHBOARD ||
        location.pathname === ROUTES.ADMIN ? (
          <div>
            <h3 className="text-xl font-bold">Welcome Back</h3>
            <p>
              Hello {auth.name}, {getUserGreetingBasedOnTime()}
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <div className="pr-4">
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 hover:text-blue-600 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div>
              <h2 className="text-3xl text-gray-400 font-semibold">
                {location.pathname === ROUTES.VIEW_ADMIN ? "Manage User" : ""}
              </h2>
            </div>
          </div>
        )}

        <div>
          {/* START USER IMAGE DROPDOWN MENU  */}
          <div className="text-right">
            <Menu as="div" className="relative inline-block text-left ">
              <div>
                <Menu.Button src={``}>
                  <img
                    alt="user"
                    className="w-12 h-12 rounded-full"
                    src="https://unavatar.now.sh/github/1stevengrant"
                  ></img>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "hover:text-blue-600 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={auth.logout}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {/* END USER IMAGE DROPDOWN MENU  */}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
