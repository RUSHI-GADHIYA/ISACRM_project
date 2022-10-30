import React from "react";
import StudentDocs from "./StudentDocs";


export const StudentDocsPage = () => {
    return (
        <div className="h-full bg-slate-100 pt-6 overflow-y-scroll">
            <StudentDocs></StudentDocs>
        </div>
    );
};

export default StudentDocsPage;
