import React from "react";

const Category = (props) => {
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-center">
        {props.rowdata.map((row) => {
          return (
            <button
              className="bg-stone-300 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3  rounded shadow mr-2"
              onClick={() => props.filter(row)}
            >
              {row}
            </button>
          );
        })}
        <button
          className="bg-stone-300 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3  rounded shadow mr-2"
          onClick={() => props.filter([])}
        >
          ALL
        </button>
      </div>
    </div>
  );
};

export default Category;
