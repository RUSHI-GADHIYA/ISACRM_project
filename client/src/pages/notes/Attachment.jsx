import React, { useState } from "react";
import { downloadDoc } from "../../services/noteService";
import { useToast } from "../../providers/toast/ToastProvider.js";

const AttachmentButton = ({ name, _id, index }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();

    return (
        <button
            className={`bg-stone-200 text-gray-800 mt-2 font-semibold py-1 px-3 rounded mr-2`}
            onClick={() => {
                setIsLoading(true);
                downloadDoc(name, _id)
                    .then(() => {
                        setIsLoading(false);
                        addToast("Downloaded", "success");
                    })
                    .catch(() => {
                        setIsLoading(false);
                        addToast("Failed to download file!", "error");
                    });
            }}
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
                {name}
                {isLoading ? (
                    <>
                        <svg
                            role="status"
                            className="w-4 h-4 ml-2 text-white animate-spin fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </button>
    );
};

export default AttachmentButton;
