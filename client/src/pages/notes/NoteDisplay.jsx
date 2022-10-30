import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import { getAllNotesApi } from "../../services/noteService";
import Note from "./Note";
import Category from "./Category";
import { LoadingButton } from "../../components/LoadingButton";

export default function NoteDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [notes, setNotes] = useState([]);
  const [orginNotes, setOrginNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const refreshNotes = () => {
    getAllNotesApi(searchParams.get("id"))
      .then((res) => {
        setNotes(res.data);
        setOrginNotes(res.data);
        setCategories(getCategories(res.data));
      })
      .catch((err) => { });
  };

  useEffect(() => {
    refreshNotes();
  }, []);

  const getCategories = (data) => data
    .map((note) => note.category)
    .flat()
    .filter((item) => item !== "")
    .filter((value, index, self) => self.indexOf(value) === index);

  const filterItem = (curcat) => {
    var newData = curcat.filter((item) => item.selected === true && item.name !== 'All').map((item) => item.name);
    const newItem = orginNotes.filter((note) => {
      return note.category.filter((cat) => newData.includes(cat)).length > 0;
    });
    setNotes(newItem);
  };

  return (
    <div className="w-full px-12 pt-5 ">
      <div className="flex flex-row items-center">
        <div className="relative rounded-md my-4 w-full mr-4 ">
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
            className="bg-stone-200 block w-full pl-9 pr-9 py-2 sm:text-sm border rounded-md h-10"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <LoadingButton
          icon={
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
          }
          title={"Add Student Note/Doc"}
          width="w-80"
          onClick={() => {
            navigate({
              pathname: ROUTES.ADD_NOTE,
              search: `?id=${searchParams.get("id")}`,
            });
          }}
        ></LoadingButton>
      </div>

      <div className="flex mt-4 items-center">
        <h6 className="mr-4 w-30 whitespace-nowrap"> Note Type :</h6>
        <Category rowdata={categories} filter={filterItem} />
      </div>
      <div className="mx-auto w-full rounded-2xl bg-gray pt-4">
        <Note rowdata={notes.filter((value) => value.title.includes(search))} refreshNotes={refreshNotes} />
      </div>
    </div>
  );
}
