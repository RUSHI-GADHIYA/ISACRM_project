import React from "react";
import { useLocation } from "react-router-dom";
import StudentForm from "./StudentInformationForm";

function StudentInformationPage() {
  const location = useLocation();

  return (
    <div className="h-full bg-slate-100 pt-6">
      <StudentForm student_data={location.state}></StudentForm>
    </div>
  );
}

export default StudentInformationPage;
