import React, { useState, useRef } from "react";
import { LoadingButton } from "../../components/LoadingButton";
import { useToast } from "../../providers/toast/ToastProvider";
import { uploadDataFile } from "../../services/otherService";

const ImportDataPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { addToast } = useToast();

    const fielInputRef = useRef(null);

    let handleClick = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("datafile", selectedFile);
            uploadDataFile(formData)
                .then((res) => {
                    if (res.success) {
                        setSelectedFile(null);
                        fielInputRef.current.value = "";
                        setIsLoading(false);
                        addToast("Data Imported Sucessfully!", "success");
                    } else {
                        setIsLoading(false);
                        addToast("Failed to import data", "error");
                    }
                })
                .catch((e) => {
                    setIsLoading(false);
                    addToast("Failed to import data", "error");
                });
            setIsLoading(false);
        } else {
            addToast("Please select a file", "error");
        }
    };

    return (
        <div className="border border-1 border-stone-300 mt-5 rounded-md p-6">
            <div>
                <h1 className="text-2xl font-bold">Import Data</h1>
                <p className="text-lg">Import data from a .xls file.</p>
                <div className="flex flex-col">
                    {console.log(selectedFile != null ? selectedFile.name : '')}
                    <input
                        className="mt-5"
                        type="file"
                        ref={fielInputRef}
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setSelectedFile(e.target.files[0]);
                        }}
                    ></input>
                    <div className="mt-5">
                        <LoadingButton
                            onClick={handleClick}
                            isLoading={isLoading}
                            className="d-flex"
                            width={"w-33"}
                            loadingTitle={"Importing..."}
                            title={"Start Import"}
                        ></LoadingButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportDataPage;
