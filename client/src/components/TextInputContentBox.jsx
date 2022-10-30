import React, { useImperativeHandle, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// TEXT INPUT COMPONENT WITH VALIDATION
const TextInputContentBox = React.forwardRef((props, ref) => {
    const [error, setError] = useState(false);
    const [value, setValue] = useState(null);

    const handleChange = (evt) => {
        setValue(evt);
        validate(evt);
    };

    const validate = (value) => {
        var validation = props.validator(value);
        if (validation === true) {
            setError("");
            return true;
        } else {
            setError(validation);
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
            <div
                className={`editor mb-3`}
            >
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        removePlugins: ["Heading", "Link", "CKFinder"],
                        toolbar: [
                            "bold",
                            "italic",
                            "numberedlist",
                            "bulletedlist",
                            "blockQuote",
                        ],
                        htmlEncodeOutput: true,
                    }}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "height",
                                "200px",
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // props.onChange(data);
                        handleChange(data);
                    }}
                    onBlur={(event, editor) => { }}
                    onFocus={(event, editor) => { }}
                />
            </div>
        </div>
    );
});

TextInputContentBox.defaultProps = {
    validator: () => {
        return true;
    },
    font: "font-normal text-sm",
};

export default TextInputContentBox;
