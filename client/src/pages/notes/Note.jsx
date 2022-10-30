import React, { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useLocation, useSearchParams } from "react-router-dom";
import { DeleteNoteApi } from "../../services/noteService.js";
import { useToast } from "../../providers/toast/ToastProvider.js";
import AttachmentButton from "./Attachment.jsx";

function DeleteNote(props) {
  const { addToast } = useToast();
  return (
    <div
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this note?") == true) {
          DeleteNoteApi(props.userId, props.noteid)
            .then((res) => {
              if (res.success) {
                // setIsLoading(false);
                // navigate(-1);
                props.refreshNotes();
                addToast("Note deleted", "success");
              } else {
                addToast("Failed to delete Note", "error");
              }
            })
            .catch((e) => {
              addToast("Failed to delete Note", "error");
            })
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function Note({ rowdata, refreshNotes }) {
  const [impFlag, setImpFlag] = useState(true);
  const [searchParams] = useSearchParams();
  const importantNoteHandler = (e) => {
    setImpFlag(!e.target.checked);

  }

  return rowdata.map((data, index) => {
    const { title, content, updated, _id, category, attachedFiles } = data;

    return (
      <Disclosure key={index}>
        {({ open }) => (
          <div className="flex flex-col my-2 border bg-white border-gray-200 rounded-md ">
            <Disclosure.Button className="flex w-full justify-between px-6 py-4 text-left text-base font-medium text-grey-400">
              <span>{title}</span>
              <ChevronUpIcon
                className={`${!open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-6 pb-4 text-sm text-gray-500  ">

                {
                  <div className="ck-content border border-gray-300 rounded-sm px-4 text-black" dangerouslySetInnerHTML={{ __html: content }} />
                }

                <div className="mt-4"></div>
                {
                  attachedFiles.length > 0 && (<div className="mr-3 text-black font-bold">Attachments:</div>)
                }

                {attachedFiles.map((row, index) => {
                  return (
                    <AttachmentButton name={row.originalName} _id={row._id} key={index} />
                  );
                })}
                <div className="mt-4"></div>
                {
                  category.length > 0 && (<div className="mr-3 text-black font-bold">Note Category:</div>)
                }

                {category.map((row, index) => {
                  return (
                    <button
                      key={index}
                      className={` text-gray-800 mt-2 font-semibold py-1 px-3 mr-2 border border-gray-300 rounded-md `}
                    >
                      {row}
                    </button>
                  );
                })}
                <div className="flex w-full justify-between mt-2 pt-4">
                  <span>{updated}</span>
                  <div className="flex items-center">
                    <span className="mr-5">
                      <div className="text-lg">
                        <input type="checkbox" className="h-4 w-4 mr-2" onChange={importantNoteHandler} />
                        <label>Mark As Important</label>
                      </div>
                    </span>
                    <DeleteNote noteid={_id} refreshNotes={refreshNotes} userId={searchParams.get('id')} />
                  </div>

                </div>
              </Disclosure.Panel>
            </Transition>

          </div>
        )
        }
      </Disclosure>
    );
  });
}
