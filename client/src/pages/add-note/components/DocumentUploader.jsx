import React from "react";
import { useDropzone } from "react-dropzone";

const DocumentUploader = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <section className="w-full border-2 px-5 py-5 bg-white rounded my-5">
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
      <aside className="py-4 list-disc">
        <ol>{files}</ol>
      </aside>
    </div>
  );
};

export default DocumentUploader;
