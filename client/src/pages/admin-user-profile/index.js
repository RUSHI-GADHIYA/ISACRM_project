import React from "react";
import Form from "./Form";
import { useLocation } from "react-router-dom";

function AdminProfileForm() {
  const location = useLocation();
  return (
    <>
      <div className="h-full bg-slate-100 pt-6">
        <Form user={location.state} ></Form>
      </div>
    </>
  );
}

export default AdminProfileForm;
