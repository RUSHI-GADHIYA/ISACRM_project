import React, { useEffect, useRef, useState } from "react";
import { LoadingButton } from "../../components/LoadingButton";
import TextMultiSelectInput from "../../components/TextMultiSelectInput";
import { getAllIntakes, getStudentsWithFilters } from "../../services/emailService";
import { getAllPrograms } from "../../services/programService";

const campusFilter = ["Saskatoon", "Prince Albert", "Moose Jaw", "Regina"];
const myCampusFilters = campusFilter.map((item) => ({
  name: item,
  isActive: false,
}));

// PAGE FOR DISPLAYING FILTER FOR CAMPUS,INTAKE AND STUDENT PROGRAM
function Form() {
  const [list, setList] = useState(myCampusFilters);
  const [intakeList, setIntakeList] = useState([]);
  const programInput = useRef(null);

  useEffect(() => {
    getAllIntakes().then((res) => {
      const intakeFilter = res.data;
      // const intakeFilter = ['Fall Semester 2022/2023'];
      const myIntake = intakeFilter.map((item) => ({ intake: item, isActive: false }))
      setIntakeList(myIntake)
    }).catch((err) => {
      console.log(err);
    });

  }, []);

  const handleSubmit = (e) => {
    const data = {
      campus: list.filter((item) => item.isActive).map((item) => item.name),
      intake: intakeList.filter((item) => item.isActive).map((item) => item.intake),
      program: programInput.current.value
    }

    getStudentsWithFilters(data).then((res) => {
      const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
      ];

      let csvContent = "data:text/csv;charset=utf-8,";

      res.data.forEach(function (rowArray) {
        let row = rowArray;
        csvContent += row + "\r\n";
      });

      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleCampus = (index) => {
    list[index].isActive = !list[index].isActive;
    setList([...list]);
  };

  const handleIntake = (index) => {
    intakeList[index].isActive = !intakeList[index].isActive;
    setIntakeList([...intakeList])
  }

  return (
    <div className="mx-12 bg-white">
      <div className="flex flex-col items-start border border-1 border-stone-300 mt-5 rounded-md p-6 mb-5">
        <div className="flex-1 mb-3">
          <h1 className="text-2xl font-bold">Select Audience</h1>
          <p className="text-lg">Apply filters for email campaign.</p>
        </div>

        <p className='font-semibold w-20'>Campus :</p>

        <div className='flex items-center my-2'>

          {list.map(({ name, isActive }, index) => {
            return (
              <button key={index} className={`rounded-md p-1 mr-2  ${isActive ? "bg-blue-500 text-white" : "bg-stone-200"} `} onClick={() => handleCampus(index)} >{name} </button>
            )
          })}
        </div>

        <p className='font-semibold w-20'>Intake :</p>
        <div className='flex items-center my-2'>

          {intakeList.map(({ intake, isActive }, index) => {
            return (
              <button key={index} className={`rounded-md p-1 mx-1  ${isActive ? "bg-blue-500 text-white" : " bg-stone-200"} `} onClick={() => handleIntake(index)} >{intake}</button>
            )
          })}
        </div>

        <TextMultiSelectInput
          width="w-2/5"
          placeholder=""
          ref={programInput}
          apiFunction={getAllPrograms}
          label="Student Program(s)"
          type="text"
          id="programs"
          font="font-bold text-base"
          mapFunction={(entity) => {
            return {
              value: {
                name: entity.name,
                campus: entity.campus,
                status: "Current",
              },
              label: entity.name + " - " + entity.campus,
            };
          }}
        ></TextMultiSelectInput>

        <div className="my-2"></div>
        <LoadingButton
          width="w-1/5"
          title={"Start Campaign"}
          onClick={handleSubmit}
        ></LoadingButton>
      </div>
    </div>
  );
}

export default Form;
