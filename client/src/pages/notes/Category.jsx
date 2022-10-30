import React, { useState, useEffect } from "react";

const Buttons = ({ rowdata, filter }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    var newRowData = ["All", ...rowdata];
    setCategories(
      newRowData.map(name => {
        return {
          name: name,
          selected: true
        }
      })
    );
  }, [rowdata])


  const handleClick = (index) => {
    const newCategories = [...categories];
    if (index != 0) {
      if (newCategories[0].selected) {
        newCategories[index].selected = false;
        newCategories.forEach(category => {
          category.selected = false;
        })
        newCategories[index].selected = !newCategories[index].selected;
      } else {

        if (newCategories.filter(category => category.selected).length > 1) {
          newCategories[index].selected = !newCategories[index].selected;
        } else {
          if (!newCategories[index].selected) {
            newCategories[index].selected = true;
          }
        }
      }
    } else {
      newCategories.forEach(category => {
        category.selected = true;
      })
    }

    if (newCategories.filter(category => category.selected).length == newCategories.length - 1) {
      newCategories[0].selected = true;
    }
    // newCategories[index].selected = !newCategories[index].selected;
    filter(newCategories);
    setCategories(newCategories);
  }

  return (
    <div className="d-flex justify-content-center">
      {categories.map((row, index) => {
        return (
          <button
            key={index}
            className={`${row.selected ? 'bg-blue-600 text-white' : 'bg-stone-200 text-gray-800'} my-2 font-semibold py-1 px-3 rounded mr-2`}
            onClick={() => handleClick(index)}
          >
            {row.name}
          </button>
        );
      })}
      {
        //   <button
        //   className="bg-stone-200 hover:bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded mr-2"
        //   onClick={() => props.filter([])}
        // >
        //   ALL
        // </button>
      }
    </div>
  );
};

export default Buttons;
