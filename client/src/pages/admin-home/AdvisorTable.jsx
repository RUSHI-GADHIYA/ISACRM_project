import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import { getAllUsers } from "../../services/userService";
import AdvisorTableRow from "./AdvisorTableRow";

// Component for displaying advisor list on table
function AdvisorTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="h-full">
      <div className="w-full overflow-auto">
        {/* START TABLE COMPONENT */}
        <div className="basis-2/5 flex justify-end mb-4">
          <button
            onClick={() => {
              navigate(ROUTES.ADD_ADMIN);
            }}
            className="h-12 w-56 bg-blue-500 hover:bg-blue-800 text-green-100 border  py-2 px-6 font-semibold text-md rounded mt-5"
          >
            <p> Add User</p>
          </button>
        </div>
        <table className="w-full">
          <thead className="rounded-md bg-stone-300 font-bold ">
            <tr className="">
              <th className="py-3 pl-6 pr-4 text-left rounded-tl-lg w-[23%]">
                Advisor Name
              </th>
              <th className="py-3 pl-2 pr-4 text-left w-[23%]">Email</th>
              <th className="py-3 pl-2 pr-4 text-left w-[23%]">Campus</th>
              <th className="py-3 pl-2 pr-4 text-left rounded-tr-lg w-[31%]">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {Advisors && Advisors.length ? ( */}
            {/* // NOTE:  Getting all rows of the table by AdvisorTableRow component */}
            <AdvisorTableRow rowsData={data}></AdvisorTableRow>
            {/* ) : null} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdvisorTable;
