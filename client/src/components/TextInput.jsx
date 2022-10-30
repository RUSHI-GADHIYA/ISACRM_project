import React, { useImperativeHandle, useState } from "react";
// TEXT INPUT COMPONENT WITH VALIDATION
const TextInput = React.forwardRef((props, ref) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(props.value ?? '');

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
        <input
          type={props.type}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onChange={handleChange}
          value={value}
          id={props.id}
          className={`px-2 py-2 placeholder-slate-300 text-slate-600 relative rounded border ${error != "" ? "border-red-500" : "border-slate-300"
            }  outline-none focus:outline-none focus:ring-blue-400 focus:ring-1 w-full appearance-none`}
        />
        {props.icon && props.icon}
        {error !== "" && (
          <p className="text-red-500 text-xs italic mt-2">{error}</p>
        )}
      </div>
    </div>
  );
});

TextInput.defaultProps = {
  validator: () => {
    return true;
  },
  font: "font-normal text-sm",
};

export default TextInput;
