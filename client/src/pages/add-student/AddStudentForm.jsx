import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { PlusIcon } from "../../components/Icons";
import { LoadingButton } from "../../components/LoadingButton";
import TextInput from "../../components/TextInput";
import TextMultiSelectInput from "../../components/TextMultiSelectInput";
import TextSelectInput from "../../components/TextSelectInput";
import { useToast } from "../../providers/toast/ToastProvider";
import { getAllPrograms } from "../../services/programService";
import { createStudentApi } from "../../services/studentService";
import {
  validateDateOfBirth,
  validateEmail,
  validateFirstName,
  validateGender,
  validateLastName,
  validatePhoneNumber,
  validateStudentId,
} from "../../utils/validators";
var countries = require("../../assets/json/countries.json");

const AddStudentForm = () => {
  // State
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const { addToast } = useToast();
  let navigate = useNavigate();

  // Refs
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const studentIdInput = useRef(null);
  const programInput = useRef(null);
  const countryInput = useRef(null);
  const emailInput = useRef(null);
  const dateOfBirthInput = useRef(null);
  const phoneInput = useRef(null);
  const genderInput = useRef(null);

  // Effects
  let handleSubmit = async (e) => {

    // Prevent default form submission
    e.preventDefault();

    // Validate all inputs
    if (
      firstNameInput.current.validate() &&
      lastNameInput.current.validate() &&
      studentIdInput.current.validate() &&
      programInput.current.validate() &&
      countryInput.current.validate() &&
      emailInput.current.validate() &&
      dateOfBirthInput.current.validate() &&
      phoneInput.current.validate() &&
      genderInput.current.validate()
    ) {
      setIsLoading(true);
      try {
        const data = {
          studentId: studentIdInput.current.value,
          firstName: firstNameInput.current.value,
          name:
            lastNameInput.current.value + ", " + firstNameInput.current.value,
          lastName: lastNameInput.current.value,
          homeCountry: countryInput.current.value,
          dob: dateOfBirthInput.current.value,
          gender: genderInput.current.value,
          email: emailInput.current.value,
          phone: phoneInput.current.value,
          program: programInput.current.value,
        };
        createStudentApi(data)
          .then((res) => {
            if (res.success) {
              // Student Created Successfully
              // Set Loading to false
              setIsLoading(false);
              // Navigate to home page
              navigate("/");
              // Show toast
              addToast("Student Created", "success");
            } else {
              // Student Creation Failed
              // Set Loading to false
              setIsLoading(false);
              // Show toast
              addToast("Failed to create a student", "error");
            }
          })
          .catch((e) => {
            // Student Creation Failed
            // Set Loading to false
            setIsLoading(false);
            // Show toast
            addToast("Failed to create a student", "error");
          });
      } catch (err) { }
    }
  };

  return (
    <div className="w-full px-12">
      <div className="container mx-auto text-xl font-bold">
        <form className="m-8 mt-8 " onSubmit={handleSubmit}>
          <div className="basis-2/5 mt-10 flex justify-end">
            <LoadingButton
              width="w-33"
              isLoading={isLoading}
              title="Add Student"
              loadingTitle="Loading..."
              onClick={handleSubmit}
              icon={<PlusIcon />}
            ></LoadingButton>
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
          <div className="flex flex-wrap justify-between shrink-0">
            <div className="basis-2/5 flex flex-col">
              <TextInput
                ref={studentIdInput}
                width="w-full"
                placeholder=""
                label="Student ID"
                type="number"
                id="sid"
                validator={validateStudentId}
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
          <div className="flex flex-wrap justify-between w-full shrink-0 my-4">
            <div className="basis-2/5 flex flex-col ">
              <TextSelectInput
                ref={countryInput}
                width="w-full"
                placeholder=""
                label="Country"
                type="text"
                id="country"
                font="font-bold text-base"
                options={countries.map((country) => {
                  return { value: country.name, label: country.name };
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
                value="Male"
                id="country"
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
                width="w-full"
                ref={dateOfBirthInput}
                placeholder=""
                label="Date of Birth"
                type="date"
                id="dateOfBirth"
                validator={validateDateOfBirth}
                font="font-bold text-base"
              ></TextInput>
            </div>
            <div className="basis-2/5 flex flex-col">
              <TextInput
                ref={phoneInput}
                width="w-full"
                placeholder=""
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                validator={validatePhoneNumber}
                font="font-bold text-base"
              ></TextInput>
            </div>
          </div>
          <div className="flex flex-wrap justify-between my-4"></div>
          <div className="basis-2/5 flex-col ">
            <TextMultiSelectInput
              width="w-2/5"
              ref={programInput}
              placeholder=""
              apiFunction={getAllPrograms}
              label="Student Program(s)"
              type="text"
              id="programs"
              font="font-bold text-base"
              mapFunction={
                (entity) => {
                  return {
                    value: {
                      name: entity.name,
                      campus: entity.campus,
                      status: "Current",
                    },
                    label: entity.name + " - " + entity.campus,
                  };
                }
              }
            ></TextMultiSelectInput>
          </div>
        </form>
      </div >
    </div >
  );
};

export default AddStudentForm;
