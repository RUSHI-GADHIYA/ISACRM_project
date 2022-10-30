import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { ROUTES } from "../../../config/constants";

function TableRow({ rowsData }) {
  const navigate = useNavigate();

  return rowsData.map((data, index) => {
    const { _id, name, email, studentId, program } = data;
    const programName = program.map(program => program.name).join(", ")
    return (
      // START TABLE ROWS
      <tr className="" key={index}>
        <td className="pl-6 pr-4 border-b-2  ">
          <p>{name}</p>
        </td>
        <td className="pl-2 pr-4  border-b-2  ">
          <p>{email}</p>
        </td>
        <td className="pl-2 pr-4 border-b-2">
          <p>{studentId}</p>
        </td>
        <td className="pl-2 pr-4 border-b-2">
          <p>{program.length ? programName : "N/A"}</p>
        </td>
        <td className="p-4 border-b-2 cursor-pointer text-center ">
          <a
            className="text-blue-400 hover:text-blue-600"
            onClick={() => {
              navigate({
                pathname: ROUTES.STUDENT_NOTES,
                search: createSearchParams({
                  id: _id
                }).toString()
              });
            }}
          >
            View
          </a>
        </td>
      </tr>
    );
  });
}

export default TableRow;
