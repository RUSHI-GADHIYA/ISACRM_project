import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../../providers/toast/ToastProvider.js";
import { createNoteApi } from "../../services/noteService.js";
import { getAllCategories } from "../../services/categoryService.js";
import TextInput from "../../components/TextInput";
import { useAuth } from "../../providers/auth/AuthContext";
import TextMultiSelectInput from "../../components/TextMultiSelectInput";
import { LoadingButton } from "../../components/LoadingButton.jsx";
import TextInputContentBox from "../../components/TextInputContentBox.jsx";
import InputDocumentUpload from "../../components/InputDocumentUpload.jsx";
import { validateCategory, validateDateOfBirth, validateTitle } from "../../utils/validators.js";

const AddNoteForm = (props) => {

  // Refs
  const titleInput = useRef(null);
  const contentInput = useRef(null);
  const categoryInput = useRef(null);
  const documentInput = useRef(null);
  const dateInput = useRef(null);

  // State
  const [isRisiaRestricted, setIsRisiaRestricted] = useState(false);
  const [isRcicRestricted, setIsRcicRestricted] = useState(false);
  const [isFlaged, setIsFlaged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const auth = useAuth();

  // Effects
  let handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all inputs
    if (titleInput.current.validate() &&
      contentInput.current.validate() &&
      categoryInput.current.validate() &&
      documentInput.current.validate() &&
      dateInput.current.validate()) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", titleInput.current.value);
        categoryInput.current.value.map((category) => {
          formData.append("category", category);
        });
        // formData.append("category", categoryInput.current.value);
        formData.append("content", contentInput.current.value);
        formData.append("date", dateInput.current.value);
        formData.append("isRisia", isRisiaRestricted);
        formData.append("isRcic", isRcicRestricted);
        formData.append("isFlag", isFlaged);
        documentInput.current.value.forEach(
          (file) => formData.append("notes", file)
        )

        createNoteApi(formData, searchParams.get("id"))
          .then((res) => {
            if (res.success) {
              setIsLoading(false);
              navigate(-1);
              addToast("Note Created", "success");
            } else {
              setIsLoading(false);
              addToast("Failed to create a note", "error");
            }
          })
          .catch((e) => {
            setIsLoading(false);
            addToast("Failed to create a note", "error");
          });
      } catch (err) {
        setIsLoading(false);
      }
    }


  };

  return (
    <div className="px-12 h-full bg-slate-100 pt-10">
      <form className="flex w-full flex-row" onSubmit={handleSubmit}>
        <div className="w-3/4 lg:px-8 xl:px-8 md:px-4 px-2">
          <TextInput
            width="w-full"
            ref={titleInput}
            placeholder=""
            label="Title"
            type="title"
            id="title"
            validator={validateTitle}
            font="font-bold text-base"
          ></TextInput>
          <div className="mt-6"></div>
          <TextInputContentBox
            label="Content"
            ref={contentInput}
            placeholder=""
            id="content"
            font="font-bold text-base"
            width="w-full">
          </TextInputContentBox>
          <div className="mt-6"></div>
          <InputDocumentUpload
            label="Attachements"
            ref={documentInput}
            placeholder=""
            id="attachment"
            font="font-bold text-base"
            width="w-full">
          </InputDocumentUpload>
        </div>
        <div className="lg:px-8 xl:px-8 md:px-4 px-2 w-1/4 h-full py-5">
          <div className="py-0 my-5">
            <LoadingButton
              width="w-full"
              isLoading={isLoading}
              title="Add Note"
              loadingTitle="Loading..."
              onClick={handleSubmit}
            ></LoadingButton>
          </div>
          <TextInput
            width="w-full"
            placeholder=""
            ref={dateInput}
            label="Date"
            validator={validateDateOfBirth}
            type="date"
            id="date"
            font="font-bold text-base"
          ></TextInput>
          <div className="mt-6"></div>
          <TextMultiSelectInput
            width="w-full"
            ref={categoryInput}
            placeholder=""
            apiFunction={getAllCategories}
            label="Note Category(s)"
            type="text"
            validator={validateCategory}
            id="programs"
            font="font-bold text-base"
          ></TextMultiSelectInput>
          <div className="mt-6"></div>
          <TextInput
            width="w-full"
            placeholder=""
            disabled={true}
            label="Author"
            type="author"
            value={auth.name}
            id="author"
            font="font-bold text-base"
          ></TextInput>

          <div>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                value={isRisiaRestricted}
                onChange={() => {
                  setIsRisiaRestricted(!isRisiaRestricted);
                }}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">RISIA Restricted</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                value={isRcicRestricted}
                onChange={() => {
                  setIsRcicRestricted(!isRcicRestricted);
                }}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">RCIC Restricted</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                value={isFlaged}
                onChange={() => {
                  setIsFlaged(!isFlaged);
                }}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Flag</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export { AddNoteForm };
