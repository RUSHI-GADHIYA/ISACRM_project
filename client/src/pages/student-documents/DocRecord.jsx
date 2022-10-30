import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";

function TableRow({ rowsData }) {
  const navigate = useNavigate();


  return rowsData.map((data, index) => {
    const { name, type, date } = data;
    return (
      // START TABLE ROWS
      <tr className="" key={index}>
        <td className="pl-6 pr-4 border-b-2  ">
          <p>{name}</p>
        </td>
        <td className="pl-2 pr-4  border-b-2 ">
          <p>{type}</p>
        </td>
        <td className="pl-2 pr-4 border-b-2">
          <p>{date}</p>
        </td>
        <td className="pl-2 pr-4 border-b-2 text-center">
          <a
            className="text-blue-400 hover:text-blue-600 font-semibold cursor-pointer"
            onClick={() => {
              // navigate(ROUTES.STUDENT_NOTES, { state: data });
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
