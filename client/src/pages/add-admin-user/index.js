import React from "react";
import AddAdminUserForm from "./AddAdminUserForm";

function AddAdminUser() {
  return (
    <>
      <div className="h-full bg-slate-100 pt-6">
        {/* // Here prop  if "toDisplayInformation= true" for displaying page for show adviser profile  */}
        {/* // "toDisplayInformation = false" for displaying form for update that user. */}
        <AddAdminUserForm></AddAdminUserForm>
      </div>
    </>
  );
}

export default AddAdminUser;
