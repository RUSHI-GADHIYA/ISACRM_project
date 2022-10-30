import React from "react";
import TableRow from "./StudentTableRow";

function StudentTable(props) {
  const students = props.students;
  const filter = props.filter;
  var campusFilter = [];
  var intakeFilter = [];
  var programFilter = [];
  if (filter) {
    filter[0].forEach(campus => {
      if (campus.isActive) {
        campusFilter.push(campus.name)
      }
    })
    filter[1].forEach(intake => {
      if (intake.isActive) {
        intakeFilter.push(intake.intake)
      }
    })
    filter[2].forEach(program => {
      programFilter.push(program.value)
    })
  }
  var resultFilter = students.filter(student => {
    if (programFilter.length > 0) {
      return student.program.filter(program => programFilter.includes(program.name)).length > 0
    } else {
      return true
    }
  }).filter(
    student => {
      if (campusFilter.length > 0) {
        return student.program.filter(program => campusFilter.includes(program.campus)).length > 0
      } else {
        return true
      }
    }
  ).filter(
    student => {
      if (intakeFilter.length > 0) {
        return intakeFilter.includes(student.intake)
      } else {
        return true
      }
    }
  )
  return (
    <div className="w-full overflow-auto">
      {/* START TABLE COMPONENT */}
      <table className="w-full">
        <thead className="rounded-md bg-stone-300 font-bold ">
          <tr className="">
            <th className="py-3 pl-6 pr-4 text-left rounded-tl-lg w-1/4">
              Student Name
            </th>
            <th className="py-3 pl-2 pr-4 text-left w-1/4">Email</th>
            <th className="py-3 pl-2 pr-4 text-left w-1/5">Student Id</th>
            <th className="py-3 pl-2 pr-4 text-left w-1/5">Program</th>
            <th className="py-3 pl-2 pr-4 text-left rounded-tr-lg w-1/4"> </th>
          </tr>
        </thead>
        <tbody>
          {students && students.length ? (
            <TableRow rowsData={resultFilter}></TableRow>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
