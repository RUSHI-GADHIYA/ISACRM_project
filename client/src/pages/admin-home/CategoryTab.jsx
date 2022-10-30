import React, { useEffect, useState, useRef } from "react";
import { LoadingButton } from "../../components/LoadingButton";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../../services/categoryService";
import TextInput from "../../components/TextInput";
import { validateCategoryName } from "../../utils/validators";

// Component for create and delete Category
function CategoryTab() {

  const inputRef = useRef(null);

  const refreshCategory = () => {
    getAllCategories()
      .then((res) => {
        setcategoryList(res.data);
      })
      .catch((err) => {
        setcategoryList([]);
      });
  };

  useEffect(() => {
    refreshCategory();
  }, []);

  const [categoryList, setcategoryList] = useState([]);
  const [inputCategoryName, setInputCategoryName] = useState(""); // store user input from input fi

  // delete Category function handler
  const deleteItem = (id) => () =>
    deleteCategory(id)
      .then((res) => {
        refreshCategory();
        setInputCategoryName("");
      })
      .catch((err) => { });

  // Add category function handler
  const HandleAdd = () => {
    console.log(inputRef.current.value);

    if (inputRef.current.validate()) {
      createCategory({
        name: inputRef.current.value
      })
        .then((res) => {
          inputRef.current.setVal("");
          refreshCategory();
          setInputCategoryName("");
        })
        .catch((err) => { });
    }
  };

  return (
    <>
      <div className="flex flex-col items-start border border-1 border-stone-300 mt-5 rounded-md p-6 mb-5">
        <div className="flex-1 mb-3">
          <h1 className="text-2xl font-bold">Category</h1>
          <p className="text-lg">
            Create and delete category for notes.
          </p>
        </div>
        <TextInput
          type="text"
          ref={inputRef}
          label="Category Name"
          font="font-bold text-base"
          validator={validateCategoryName}
        >
        </TextInput>
        <LoadingButton
          width="w-auto"
          title={`Add Category`}
          onClick={HandleAdd}
        ></LoadingButton>
      </div>

      <div className="bg-stone-300 rounded-t">
        <div className="flex p-3 ">
          <p>Id</p>
          <p className="px-56">Category Name</p>
          <p></p>
        </div>
      </div>
      {categoryList.map((it, index) => {
        return (
          <div key={index}>
            <div className="">
              <div className="p-2 border-b flex justify-between ">
                <div className="flex">
                  <p className="">{index + 1}</p>
                  <p className="px-56">{it.name}</p>
                </div>
                <button
                  onClick={deleteItem(it._id)}
                  className="px-6 text-lg font-bold text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CategoryTab;
