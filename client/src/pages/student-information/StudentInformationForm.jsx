import React, { useState, useRef, useEffect } from "react";
import Moment from "moment";
import { getStudent, updateStudentApi } from "../../services/studentService";
import { useToast } from "../../providers/toast/ToastProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusIcon } from "../../components/Icons";
import { LoadingButton } from "../../components/LoadingButton";
import TextInput from "../../components/TextInput";
import TextMultiSelectInput from "../../components/TextMultiSelectInput";
import TextSelectInput from "../../components/TextSelectInput";
import {
  validateDateOfBirth,
  validateEmail,
  validateFirstName,
  validateGender,
  validateLastName,
  validatePhoneNumber,
  validateStudentId,
} from "../../utils/validators";

import { getAllPrograms } from "../../services/programService";
var countries = require("../../assets/json/countries.json");

const StudentForm = (props) => {
  // Hooks
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  // Effects
  let handleSubmit = async (e) => {

    e.preventDefault();
    if (!editable) {
      setEditable(true);
      return;
    }

    try {
      const data = {
        firstName: firstNameInput.current.value,
        name: lastNameInput.current.value + ", " + firstNameInput.current.value,
        lastName: lastNameInput.current.value,
        homeCountry: countryInput.current.value,
        dob: dateOfBirthInput.current.value,
        gender: genderInput.current.value,
        email: emailInput.current.value,
        phone: phoneInput.current.value,
        program: programInput.current.value,
      };
      updateStudentApi(data, searchParams.get('id'))
        .then((res) => {
          if (res.success) {
            // setIsLoading(false);
            navigate("/");
            addToast("Student Updated", "success");
          } else {
            addToast("Failed to update a student", "error");
          }
        })
        .catch((e) => {
          addToast("Failed to update a student", "error");
        });
    } catch (err) { }
  };

  useEffect(() => {
    getStudent(searchParams.get('id')).then(res => {
      if (res.success) {
        studentIdInput.current.setVal(res.data.studentId);
        firstNameInput.current.setVal(res.data.firstName);
        lastNameInput.current.setVal(res.data.lastName);
        countryInput.current.setVal(res.data.homeCountry);
        emailInput.current.setVal(res.data.email);
        genderInput.current.setVal(res.data.gender);
        dateOfBirthInput.current.setVal(Moment.utc(res.data.dob).format("yyyy-MM-DD"));
        phoneInput.current.setVal(res.data.phone)
        setSelectedPrograms(res.data.program);
      } else {

      }
    }).catch(err => {

    })
  }, [searchParams])

  return (
    <div className="w-full px-12">
      <div className=" container mx-auto text-xl font-bold">
        <form className="m-8 mt-8 " onSubmit={handleSubmit}>
          <div className="basis-2/5 mt-10 flex justify-end">
            <LoadingButton
              width="w-33"
              isLoading={isLoading}
              title={!editable ? "Update" : "Save"}
              loadingTitle="Loading..."
              onClick={handleSubmit}
              icon={<PlusIcon />}
            ></LoadingButton>
          </div>
          <div className="flex flex-wrap justify-between shrink-0">
            <div className="basis-2/5 flex flex-col">
              <TextInput
                ref={studentIdInput}
                width="w-full"
                placeholder=""
                label="Student ID"
                type="number"
                disabled={true}
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
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
                id="lastName"
                validator={validateLastName}
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
                disabled={!editable}
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
                disabled={!editable}
                type="text"
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
                disabled={!editable}
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
                disabled={!editable}
                type="tel"
                id="phoneNumber"
                validator={validatePhoneNumber}
                font="font-bold text-base"
              ></TextInput>
            </div>
          </div>

          <div className="basis-2/5 flex-col ">
            {!editable ? (
              <>
                <div className="pb-2">
                  <label className="block text-gray-700 font-bold mb-1 mt-2 mr-auto text-base ">Student Program(s)</label>
                </div>
                <div className="flex bg-white h-12 items-center text-base w-max rounded overflow-auto ">
                  {
                    selectedPrograms.map((item, key) => {
                      return (
                        <div className="border py-1 px-2 rounded  bg-stone-100 mx-2 h-8 text-center" key={key}>
                          {item.name + " - " + item.campus}
                        </div>
                      );
                    })
                  }
                </div>
              </>
            ) : (
              <TextMultiSelectInput
                width="w-2/5"
                ref={programInput}
                placeholder=""
                apiFunction={getAllPrograms}
                label="Student Program(s)"
                type="text"
                value={selectedPrograms.map((entity) => {
                  return {
                    value: {
                      name: entity.name,
                      campus: entity.campus,
                    },
                    label: entity.name + " - " + entity.campus,
                  };
                })}
                id="programs"
                font="font-bold text-base"
                mapFunction={
                  (entity) => {
                    return {
                      value: {
                        name: entity.name,
                        campus: entity.campus,
                      },
                      label: entity.name + " - " + entity.campus,
                    };
                  }
                }
              ></TextMultiSelectInput>
            )}

          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
