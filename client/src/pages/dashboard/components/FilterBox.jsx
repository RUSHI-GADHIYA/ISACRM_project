import React, { useEffect, useState } from 'react'
import { LoadingButton } from '../../../components/LoadingButton';
import Select from "react-select";

const campusFilter = ["Saskatoon", "Prince Albert", "Moose Jaw", "Regina"];

//const intakeFilter = ["Sept 2022", "Jan 2022", "May 2022", "Sept 2021"]




const myCampusFilters = campusFilter.map((item) => ({ name: item, isActive: false }))


// component to display filter button for campus and intake on email campaign page
function FilterBox(props) {
  const sendDataToParent = props.sendDataToParent;
  // const intakeFilter = props.intake;
  //const myIntake = intakeFilter.map((item) => ({ intake: item, isActive: false }))
  const [list, setList] = useState(myCampusFilters);
  const [intakeList, setIntakeList] = useState([]);
  const [program, setProgram] = useState([]);
  const [programOptions, setProgramOption] = useState([]);

  useEffect(() => {
    if (props.intake.length > 0) {
      const intakeFilter = props.intake;
      const myIntake = intakeFilter.map((item) => ({ intake: item, isActive: false }))
      setIntakeList(myIntake)
    }
  }, [props.intake]);

  useEffect(() => {

    if (props.program.length > 0) {
      const programs = props.program;
      const programName = programs.map(items => items.map(item => item.name))
      const mergedName = [...new Set([].concat.apply([], programName))]
      const Options = mergedName.map((item) => ({ value: item, label: item }))
      setProgramOption(Options)
    }
  }, [props.program]);




  const handleCampus = (index) => {
    list[index].isActive = !list[index].isActive;
    setList(list)
    sendDataToParent([list, intakeList, program])
  }

  const handleIntake = (index) => {
    intakeList[index].isActive = !intakeList[index].isActive;
    setIntakeList(intakeList)
    sendDataToParent([list, intakeList, program])
  }

  const sendProgramDataToParent = (e) => {
    setProgram(e)
    sendDataToParent([list, intakeList, e])
  }

  return (
    <>


      <div className='flex-col bg-white rounded-md py-3 mt-2 border border-gray-600'>
        <div className='flex items-center m-2 px-4'>

          <p className='font-semibold w-20'>Campus :</p>
          {list.map(({ name, isActive }, index) => {
            return (
              <button key={index} className={`rounded-md p-1 mx-1  ${isActive ? "bg-blue-500 text-white" : "bg-stone-200"} `} onClick={() => handleCampus(index)} >{name} </button>
            )
          })}
        </div>

        <div className='flex items-center m-2 px-4'>
          <p className='font-semibold w-20'>Intake :</p>
          {intakeList.map(({ intake, isActive }, index) => {
            return (
              <button key={index} className={`rounded-md p-1 mx-1  ${isActive ? "bg-blue-500 text-white" : " bg-stone-200"} `} onClick={() => handleIntake(index)} >{intake}</button>
            )
          })}
        </div>


        <div className="flex ">
          <div className="">
            <label className="font-semibold m-2 pl-4 pr-2 h-full align-middle w-20">Program :</label>
          </div>
          <Select
            name="Seclect"
            className="w-2/5 "
            placeholder="Filters"
            options={programOptions}
            onChange={sendProgramDataToParent}
            isMulti
          />
        </div>




      </div>





    </>
  )
}

export default FilterBox