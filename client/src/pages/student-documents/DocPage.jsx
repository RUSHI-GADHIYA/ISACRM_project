import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";

// import { getAllNotesApi } from "../../services/noteService";
// import Note from "./Note";
import Category from "./Category";
import DocTable from "./DocTable";

export default function DocPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [notes, setNotes] = useState([]);
//   const [orginNotes, setOrginNotes] = useState([]);

//   const refreshNotes = () => {
//     getAllNotesApi(location.state._id)
//       .then((res) => {
//         setNotes(res.data);
//         setOrginNotes(res.data);
//       })
//       .catch((err) => { });
//   };

//   useEffect(() => {
//     refreshNotes();
//   }, []);

//   const category = notes
//     .map((note) => note.category)
//     .filter((item) => item !== "")
//     .filter((value, index, self) => self.indexOf(value) === index);

//   const filterItem = (curcat) => {
//     const newItem = notes.filter((note) => {
//       return note.category.includes(curcat[0]);
//       // comparing category for displaying data
//     });
//     setNotes(newItem);
//     if (!curcat[0]) {
//       setNotes(orginNotes);
//     }
//   };

  return (
    <div className="w-full px-4 pt-5 bg-stone-200 h-screen">
      <div className="relative text-gray-700 flex justify-between h-12 ">
        {/* <input
          className="w-3/4 h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          placeholder="Search"
        /> */}
        <div className="relative rounded-md shadow-sm mr-4 w-full h-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
            <span className="bg-stone-300 sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
            className="bg-stone-300 block pl-9 pr-9 py-2 text-xl border rounded-md w-full h-12"
          />
        </div>
        <button
          onClick={() => {
            // navigate(ROUTES.ADD_NOTE, {
            //   state: location.state,
            // }
            // );
          }}
          className="flex items-center justify-center px-4 font-bold text-white bg-blue-600 rounded-lg w-80 h-full"
        >
          <svg
            className="w-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="pl-2">Add Student Note/Doc</p>
        </button>
      </div>
      <div className="flex mt-4">
        <h6 className=" flex items-center text-2xl pr-3 "> Docs Type :</h6>
        <Category rowdata={[]} filter={[]} />
      </div>
      <div className="mx-auto w-full rounded-2xl bg-gray pt-4">
        {/* <Note rowdata={notes} refreshNotes={refreshNotes} /> */}

        <DocTable></DocTable>
      </div>
    </div>
  );
}
