import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import { useToast } from "../../providers/toast/ToastProvider";
import { createUserApi } from "../../services/userService";
import { LoadingButton } from "../../components/LoadingButton";
import TextInput from "../../components/TextInput";
import TextSelectInput from "../../components/TextSelectInput";
import { PlusIcon } from "../../components/Icons";
import {
  validateEmail,
  validateFirstName,
  validateGender,
  validateLastName,
  validatePassword,
  validateStaffId,
} from "../../utils/validators";

const AddAdminUserForm = () => {

  // State
  const [isLoading, setIsLoading] = useState("");
  const [isRisiaApproved, setRisiaApproved] = useState(false);
  const [isRcicApproved, setRcicApproved] = useState(false);

  // Hooks
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Refs
  const staffIdInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const genderInput = useRef(null);
  const campusInput = useRef(null);
  const passwordInput = useRef(null);
  const verifyPasswordInput = useRef(null);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      staffIdInput.current.validate() &&
      emailInput.current.validate() &&
      firstNameInput.current.validate() &&
      lastNameInput.current.validate() &&
      campusInput.current.validate() &&
      genderInput.current.validate() &&
      passwordInput.current.validate() &&
      verifyPasswordInput.current.validate()
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
          password: passwordInput.current.value,
          role:
            isRisiaApproved === true
              ? "risia"
              : isRcicApproved === true
                ? "rcic"
                : "general",
        };
        createUserApi(data)
          .then((res) => {
            if (res.success) {
              // Login Successful
              setIsLoading(false);
              navigate(ROUTES.ADMIN);
              addToast("User created", "success");
            } else {
              addToast("Failed to create a user", "error");
            }
          })
          .catch((e) => {
            addToast("Failed to create a user", "error");
          });
      } catch (err) { }
    }
  };

  return (
    <>
      <div className="w-full px-12">
        <div className=" container mx-auto text-xl font-bold">
          <form className="m-8 mt-8" onSubmit={handleSubmit}>
            <div className="basis-2/5 mt-10 flex justify-end">
              <LoadingButton
                width="w-33"
                isLoading={isLoading}
                title={"Create User"}
                loadingTitle="Loading..."
                onClick={handleSubmit}
                icon={<PlusIcon />}
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
                  validator={validateStaffId}
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
                  id="lastName"
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
                  value="Saskatoon"
                  type="text"
                  id="campus"
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
                  value="Male"
                  validator={validateGender}
                  font="font-bold text-base"
                  options={["Male", "Female", "Unknown"].map((value) => {
                    return { value: value, label: value };
                  })}
                ></TextSelectInput>
              </div>
            </div>
            <div className="flex flex-wrap justify-between my-4">
              <div className="basis-2/5 flex flex-col">
                <TextInput
                  ref={passwordInput}
                  width="w-full"
                  placeholder=""
                  label="Password"
                  type="password"
                  id="password"
                  validator={validatePassword}
                  font="font-bold text-base"
                ></TextInput>
              </div>
              <div className="basis-2/5 flex flex-col">
                <TextInput
                  ref={verifyPasswordInput}
                  width="w-full"
                  placeholder=""
                  label="Verify Password"
                  type="password"
                  id="password"
                  validator={validatePassword}
                  font="font-bold text-base"
                ></TextInput>
              </div>
            </div>
            <div className="basis-2/5 flex-col font-bold text-base">
              <div className="flex mt-6 text-gray-600">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox w-5 h-5"
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
                    checked={isRcicApproved}
                    onChange={() => {
                      setRcicApproved(!isRcicApproved);
                    }}
                  />
                  <span className="ml-2">RCIC Approved</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdminUserForm;
