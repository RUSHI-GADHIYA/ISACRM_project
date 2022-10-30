import React, { useEffect, useState, useRef } from "react";
import { LoadingButton } from "../../components/LoadingButton";
import TextInput from "../../components/TextInput";
import { validateCampusName, validateCategoryName, validateProgramName } from "../../utils/validators";
import { createProgram, getAllPrograms } from "../../services/programService";
import TextSelectInput from "../../components/TextSelectInput";

// Component for create and delete Category
function ProgramTab() {

    const inputRef = useRef(null);
    const campusInputRef = useRef(null);

    const refreshPrograms = () => {
        getAllPrograms()
            .then((res) => {
                setProgramList(res.data);
            })
            .catch((err) => {
                setProgramList([]);
            });
    };

    useEffect(() => {
        refreshPrograms();
    }, []);

    const [programList, setProgramList] = useState([]);

    // Add category function handler
    const HandleAdd = () => {
        console.log(inputRef.current.value);

        if (inputRef.current.validate() && campusInputRef.current.validate()) {
            createProgram({
                name: inputRef.current.value,
                campus: campusInputRef.current.value,
            })
                .then((res) => {
                    inputRef.current.setVal("");
                    refreshPrograms();
                })
                .catch((err) => { });
        }
    };

    return (
        <>
            <div className="flex flex-col items-start border border-1 border-stone-300 mt-5 rounded-md p-6 mb-5">
                <div className="flex-1 mb-3">
                    <h1 className="text-2xl font-bold">Program</h1>
                    <p className="text-lg">
                        Create and delete programs.
                    </p>
                </div>
                <TextInput
                    width="w-2/5"
                    type="text"
                    ref={inputRef}
                    label="Program Name"
                    font="font-bold text-base"
                    validator={validateProgramName}
                >
                </TextInput>
                <TextSelectInput
                    width="w-2/5"
                    ref={campusInputRef}
                    placeholder=""
                    label="Campus"
                    type="text"
                    id="campus"
                    value="Saskatoon"
                    font="font-bold text-base"
                    options={["Saskatoon", "Moose Jaw", "Regina", "Prince Albert"].map((value) => {
                        return { value: value, label: value };
                    })}
                ></TextSelectInput>
                <LoadingButton
                    width="w-auto mt-3"
                    title={`Add Program`}
                    onClick={HandleAdd}
                ></LoadingButton>
            </div>

            <table className="w-full">
                <thead className="rounded-md bg-stone-300 font-bold ">
                    <tr className="">
                        <th className="py-3 pl-6 pr-4 text-left rounded-tl-lg w-[23%]">
                            Id
                        </th>
                        <th className="py-3 pl-2 pr-4 text-left w-[33%]">Program Name</th>
                        <th className="py-3 pl-2 pr-4 text-left rounded-tr-lg w-[23%]">Campus</th>
                    </tr>
                </thead>
                <tbody>
                    {programList.map((it, index) => {
                        return (
                            <tr key={index} >
                                <td className="pl-2 pr-4 border-b-2 py-3">{index + 1}</td>
                                <td className="pl-2 pr-4 border-b-2 ">{it.name}</td>
                                <td className="pl-2 pr-4 border-b-2 ">{it.campus}</td>
                            </tr>
                        );
                    })}
                </tbody></table>
        </>
    );
}

export default ProgramTab;
