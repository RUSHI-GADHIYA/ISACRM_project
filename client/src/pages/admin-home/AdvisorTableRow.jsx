import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";

// Component for display rows in "AdvisorTable component"
function AdvisorTableRow({ rowsData }) {
  const navigate = useNavigate();

  return rowsData.map((data, index) => {
    const { name, email, campus, role } = data;

    return (
      // START TABLE ROWS
      <tr className="" key={index}>
        <td className="pl-6 pr-4 border-b-2  ">
          <p>{name + (role === "superAdmin" ? " (Super Admin)" : "")}</p>
        </td>
        <td className="pl-2 pr-4  border-b-2  ">
          <p>{email}</p>
        </td>
        <td className="pl-2 pr-4 border-b-2">
          <p>{campus}</p>
        </td>
        {/* <td className="pl-2 pr-4 border-b-2">
                    <p>{program.length ? program.first : "N/A"}</p>
                </td> */}
        <td className="p-4 border-b-2 cursor-pointer text-center ">
          <button
            className="text-blue-400 hover:text-blue-600"
            onClick={() => {
              navigate(ROUTES.VIEW_ADMIN, { state: data });
            }}
          >
            View
          </button>
        </td>
      </tr>
    );
  });
}

export default AdvisorTableRow;
