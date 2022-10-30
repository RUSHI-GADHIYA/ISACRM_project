import React, { useImperativeHandle, useState } from "react";
// TEXT INPUT COMPONENT WITH VALIDATION
const TextSelectInput = React.forwardRef((props, ref) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleChange = (evt) => {
    setValue(evt.target.value);
    validate(evt.target.value);
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

  const setVal = (value) => {
    setValue(value);
  };

  useImperativeHandle(ref, () => ({
    validate: () => validate(value),
    setVal: (value) => setVal(value),
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
        className={`relative flex ${props.width} flex-wrap items-stretch mb-3`}
      >
        <select
          disabled={props.disabled}
          required
          value={value}
          className={`px-2 py-2 placeholder-slate-300 text-slate-600 relative rounded border ${error != "" ? "border-red-500" : "border-slate-300"
            }  outline-none focus:outline-none focus:ring-blue-400 focus:ring-1 w-full appearance-none`}
          onChange={(e) => handleChange(e)}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
});

TextSelectInput.defaultProps = {
  validator: () => {
    return true;
  },
  font: "font-normal text-sm",
};

export default TextSelectInput;
