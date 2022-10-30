import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../config/constants";
import { getStudent } from "../services/studentService";

const SideBar = ({ id }) => {
  const location = useLocation();

  const [name, setName] = useState("")
  const [studentId, setStudentID] = useState("")
  const [email, setEmail] = useState("")
  const [program, setProgram] = useState([])

  useEffect(() => {
    getStudent(id).then(res => {
      if (res.success) {
        setName(res.data.name)
        setStudentID(res.data.studentId)
        setEmail(res.data.email)
        setProgram(res.data.program.length > 0 ? res.data.program.map(prog => prog.name) : [])
      } else {

      }
    }).catch(err => {

    })
  }, [id])


  return (
    <div className="min-w-fit">
      {/* <div></div> */}
      {/* Sidebar starts */}

      <div className="">
        <div className=" w-full flex items-center">
          <div className="flex flex-col justify-center mx-auto">
            <h2 className="my-2 font-bold text-2xl text-center">{name}</h2>
            <h3 className="text-center text-lg ">{studentId}</h3>
            <p className="text-center">{email}</p>
            <h3 className="text-lg text-gray-400 text-center">
              {program.join(", ")}
            </h3>
            <p className="text-center">{ }</p>
          </div>
        </div>

        <ul className="mt-12">
          <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
            <NavLink
              to={{
                pathname: ROUTES.STUDENT_NOTES,
                search: `?id=${id}`
              }}
              replace={true}
              state={location.state}
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
                <span className="text-xl  ml-2">Student Notes</span>
              </div>
            </NavLink>
          </li>
          <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
            <NavLink
              to={{
                pathname: ROUTES.STUDENT_DOCS,
                search: `?id=${id}`
              }}
              replace={true}
              state={location.state}
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
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
                <span className="text-xl  ml-2">Student Docs</span>
              </div>
            </NavLink>
          </li>
          <li className="flex w-full justify-between text-black hover:text-blue-600 cursor-pointer items-center mb-6">
            <NavLink
              to={{
                pathname: ROUTES.STUDENT_PROFILE,
                search: `?id=${id}`
              }}
              replace={true}
              state={location.state}
              className={({ isActive }) => {
                return isActive ? "text-blue-600" : "text-black";
              }}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 pr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-xl  ml-2">Student Profile</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Sidebar ends */}
    </div>
  );
}

export default SideBar;
