import React from "react";
import NoteDisplay from "./NoteDisplay";

export const NoteDisplayPage = () => {
  return (
    <div className="h-full bg-slate-100 pt-6 overflow-y-scroll">
      <NoteDisplay></NoteDisplay>
    </div>
  );
};

export default NoteDisplayPage;
