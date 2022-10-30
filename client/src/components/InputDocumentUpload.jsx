import React, { useCallback, useImperativeHandle, useState } from "react";
import { useDropzone } from "react-dropzone";

// TEXT INPUT COMPONENT WITH VALIDATION
const InputDocumentUpload = React.forwardRef((props, ref) => {
    const [value, setValue] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setValue((value) => [...value, ...acceptedFiles]);
    }, []);

    const deletFile = (index) => {
        setValue((value) => {
            const newValue = [...value];
            newValue.splice(index, 1);
            return newValue;
        }
        );
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const validate = (value) => {
        var validation = props.validator(value);
        if (validation === true) {
            return true;
        } else {
            return false;
        }
    };

    useImperativeHandle(ref, () => ({
        validate: () => validate(value),
        value: value,
    }));

    return (
        <div className={`${props.width} ${props.font}`}>
            <label
                className="block text-gray-700 font-normal mb-1 mt-2 mr-auto"
                htmlFor={props.id}
            >
                {props.label}
            </label>
            <div className={`relative  ${props.width} flex-wrap items-stretch mb-3`}>
                <div>
                    <section className="w-full border-2 px-5 py-5 bg-white rounded">
                        <div
                            {...getRootProps({
                                className: "dropzone border-2 border-dashed text-center py-10",
                            })}
                        >
                            <input {...getInputProps()} />
                            <p>
                                <button
                                    className="text-blue-700 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Upload a file
                                </button>{" "}
                                or drag and upload
                            </p>
                        </div>
                    </section>
                    <div className="flex flex-wrap">
                        {value.map((file, index) => (
                            <div
                                className={`bg-stone-200 text-gray-800 mt-2 font-semibold py-1 px-3 rounded d-flex mr-2`}
                                onClick={() => { }}
                            >
                                <div className="flex flex-row items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mt-1 mb-1 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {file.path} - {(file.size / 1000).toFixed(1)} KB
                                    <button className="ml-2" onClick={(e) => {
                                        e.preventDefault();
                                        deletFile(index)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-red-500" viewBox="0 0 20 20" fill="">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}</div>
                </div>
            </div>
        </div>
    );
});

InputDocumentUpload.defaultProps = {
    validator: () => {
        return true;
    },
    font: "font-normal text-sm",
};

export default InputDocumentUpload;
