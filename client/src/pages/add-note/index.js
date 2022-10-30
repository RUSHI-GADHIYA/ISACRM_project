import React from "react";
import { AddNoteForm } from "./AddNoteForm";

// Declare constant component for the Add Node Frm
export const AddNotePage = () => {

  return <div className="h-full bg-slate-100 pt-6 overflow-y-scroll">
    <AddNoteForm />
  </div>
};

// export the add note page as default from this index.js
export default AddNotePage;
