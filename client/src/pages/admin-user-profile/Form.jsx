import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import { useToast } from "../../providers/toast/ToastProvider";
import { updateUser } from "../../services/userService";
import { LoadingButton } from "../../components/LoadingButton";
import TextInput from "../../components/TextInput";
import TextSelectInput from "../../components/TextSelectInput";
import { PlusIcon } from "../../components/Icons";
import {
  validateEmail,
  validateFirstName,
  validateGender,
  validateLastName,
  validateStaffId,
} from "../../utils/validators";

// Component to display form layout for user profile and updating and add user advisor.
function Form({ user }) {

  // Refs
  const staffIdInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const genderInput = useRef(null);
  const campusInput = useRef(null);

  // State
  const [editable, setEditable] = useState(false);
  const [id] = useState(user._id);
  const [isLoading, setIsLoading] = useState(false);
  const [isRisiaApproved, setRisiaApproved] = useState(user.role === "risia");
  const [isRcicApproved, setRcicApproved] = useState(user.role === "rcic");
  const [role] = useState(user.role);

  const { addToast } = useToast();
  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!editable) {
      setEditable(true);
      return;
    }

    setIsLoading(true);

    if (
      staffIdInput.current.validate() &&
      emailInput.current.validate() &&
      firstNameInput.current.validate() &&
      lastNameInput.current.validate() &&
      campusInput.current.validate() &&
      genderInput.current.validate()
    ) {
      try {
        const data = {
          staffId: staffIdInput.current.value,
          name: lastNameInput.current.value + ", " + firstNameInput.current.value,
          firstName: firstNameInput.current.value,
          lastName: lastNameInput.current.value,
          gender: genderInput.current.value,
          campus: campusInput.current.value,
          email: emailInput.current.value,
          role:
            isRisiaApproved === true
              ? "risia"
              : isRcicApproved === true
                ? "rcic"
                : role,
        };
        updateUser(data, id)
          .then((res) => {
            if (res.success) {
              // Login Successful
              setIsLoading(false);
              navigate(ROUTES.ADMIN);
              addToast("User updated", "success");
            } else {
              addToast("Failed to update a user", "error");
            }
          })
          .catch((e) => {
            addToast("Failed to update a user", "error");
          });
      } catch (err) { }
    }

  };

  return (
    <>
      <div className="w-full bg-slate-100">
        <div className="h-screen text-xl font-bold mx-20 pt-4">
          <form className="m-8 mt-8" onSubmit={handleSubmit}>
            <div className="basis-2/5 mt-10 flex justify-end">
              <LoadingButton
                width="w-half"
                isLoading={isLoading}
                title={!editable ? "Update" : "Save"}
                loadingTitle="Loading..."
                onClick={handleSubmit}
              ></LoadingButton>
            </div>
            <div className="flex flex-wrap justify-between shrink-0">
              <div className="basis-2/5 flex flex-col">
                <TextInput
                  ref={staffIdInput}
                  width="w-full"
                  placeholder=""
                  label="Staff ID"
                  type="number"
                  id="sid"
                  value={user.staffId}
                  validator={validateStaffId}
                  disabled={true}
                  font="font-bold text-base"
                ></TextInput>
              </div>
              <div className="basis-2/5 flex flex-col">
                <TextInput
                  ref={emailInput}
                  width="w-full"
                  placeholder=""
                  label="Email Address"
                  type="email"
                  id="email"
                  disabled={!editable}
                  value={user.email}
                  validator={validateEmail}
                  font="font-bold text-base"
                ></TextInput>
              </div>
            </div>
            <div className="flex flex-wrap justify-between w-full my-4">
              <div className="basis-2/5 flex flex-col">
                <TextInput
                  ref={firstNameInput}
                  width="w-full"
                  placeholder=""
                  label="First Name"
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  disabled={!editable}
                  validator={validateFirstName}
                  font="font-bold text-base"
                ></TextInput>
              </div>
              <div className="basis-2/5 flex flex-col">
                <TextInput
                  ref={lastNameInput}
                  width="w-full"
                  placeholder=""
                  label="Last Name"
                  type="text"
                  value={user.lastName}
                  id="lastName"
                  disabled={!editable}
                  validator={validateLastName}
                  font="font-bold text-base"
                ></TextInput>
              </div>
            </div>
            <div className="flex flex-wrap justify-between w-full shrink-0 my-4">
              <div className="basis-2/5 flex flex-col ">
                <TextSelectInput
                  width="w-full"
                  ref={campusInput}
                  placeholder=""
                  label="Campus"
                  type="text"
                  id="campus"
                  value={user.campus}
                  disabled={!editable}
                  font="font-bold text-base"
                  options={["Saskatoon", "Moose Jaw", "Regina", "Prince Albert"].map((value) => {
                    return { value: value, label: value };
                  })}
                ></TextSelectInput>
              </div>
              <div className="basis-2/5 flex flex-col ">
                <TextSelectInput
                  width="w-full"
                  ref={genderInput}
                  placeholder=""
                  label="Gender"
                  type="text"
                  id="gender"
                  disabled={!editable}
                  value={user.gender}
                  validator={validateGender}
                  font="font-bold text-base"
                  options={["Male", "Female", "Unknown"].map((value) => {
                    return { value: value, label: value };
                  })}
                ></TextSelectInput>
              </div>
            </div>
            {role !== "superAdmin" && (<div className="basis-2/5 flex-col font-bold text-base">
              <div className="flex mt-6 text-gray-600">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox w-5 h-5"
                    disabled={!editable}
                    checked={isRisiaApproved}
                    onChange={() => {
                      setRisiaApproved(!isRisiaApproved);
                    }}
                  />
                  <span className="ml-2 ">RISIA Approved</span>
                </label>
                <label className="flex items-center px-10 ">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    disabled={!editable}
                    checked={isRcicApproved}
                    onChange={() => {
                      setRcicApproved(!isRcicApproved);
                    }}
                  />
                  <span className="ml-2">RCIC Approved</span>
                </label>
              </div>
            </div>)}

          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
