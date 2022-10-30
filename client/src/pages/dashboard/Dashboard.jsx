import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import StudentTable from "./components/StudentTable";
import UserHeader from "../../navigation/UserHeader";
import { useAuth } from "../../providers/auth/AuthContext";
import { getAllStudentsApi, searchStudentApi } from "../../services/studentService";
import FilterBox from "./components/FilterBox";

const Dashboard = () => {

  // State
  const [students, setStudents] = useState([]);
  const [filterData, setFilterData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const [intake, setInstake] = useState([]);
  const [program, setProgram] = useState([]);
  const [tableTitle, setTitle] = useState("Recent Students")

  // Effects
  const getDataFromChild = (data) => {
    setFilterData(data)  // Todo: Program selection not giving data correctly
  }

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    getAllStudentsApi()
      .then((res) => {
        setInstake([...new Set(res.data.filter(student => student.intake != undefined).map(student => student.intake))]);
        setProgram([...new Set(res.data.filter(student => student.program.length > 0).map(student => student.program))]);
        setStudents(res.data);
      })
      .catch((err) => { });
  }

  const searchStudent = e => {
    const text = e.target.value
    const data = {
      "searchText": e.target.value
    }
    if (text.length > 2) {
      setTitle("Search Students")
      setShowFilter(true)
      searchStudentApi(data)
        .then((res) => {
          setInstake([...new Set(res.data.filter(student => student.intake != undefined).map(student => student.intake))]);
          setProgram([...new Set(res.data.filter(student => student.program.length > 0).map(student => student.program))]);
          setStudents(res.data);
        })
        .catch((err) => { });
    } else {
      setStudents([])
      if (text.length === 0) {
        setTitle("Recent Students")
        setShowFilter(false)
        getAllStudents();
      }
    }
  }

  return (
    <div className="px-12 flex flex-col grow">
      <div className="mt-1 relative rounded-md shadow-sm my-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="bg-stone-200 sm:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 font-medium text-base"
              fill="none"
              viewBox="0 0 24 24"
              stroke="grey"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
        <input
          type="text"
          name=""
          id=""
          className="bg-stone-200 block w-full pl-9 pr-9 py-2 sm:text-sm border rounded-md"
          onChange={searchStudent}

        />
      </div>

      {showFilter ? (
        <FilterBox sendDataToParent={getDataFromChild} program={program} intake={intake}></FilterBox>
      ) : null}


      <h3 className="text-lg font-semibold my-4">{showFilter ? "Search Students" : "Recent Students"}</h3>
      <StudentTable students={students} filter={filterData}></StudentTable>
      {!students.length ? (
        <div className="text-center w-full p-10">No Data</div>
      ) : null}
    </div>
  );
}

export default Dashboard;
