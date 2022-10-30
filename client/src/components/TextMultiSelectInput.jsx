import React, { useEffect, useImperativeHandle, useState } from "react";
import Select from "react-select";
import { getAllCategories } from "../services/categoryService";

// TEXT INPUT COMPONENT WITH VALIDATION
const TextMultiSelectInput = React.forwardRef((props, ref) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(props.value || []);
  const [options, setOptions] = useState([]);

  const handleChange = (value) => {
    setValue(value);
    validate(value);
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
    value: value.map((option) => option.value),
  }));

  useEffect(() => {
    props
      .apiFunction()
      .then((res) => {
        setOptions(
          res.data.map(props.mapFunction)
        );
      })
      .catch((err) => {
        setOptions([]);
      });
  }, [setOptions]);

  return (
    <div className={`${props.width} ${props.font}`}>
      {
        props.label && props.label !== "" && (
          <label
            className="block text-gray-700 font-normal mb-1 mt-2 mr-auto"
            htmlFor={props.id}
          >
            {props.label}
          </label>
        )
      }

      <div
        className={`relative w-full flex-wrap items-stretch ${props.label !== "" ? 'mb-3' : ''}`}
      >
        <Select
          isMulti
          cacheOptions
          value={options.filter((item) => value.filter((item2) => item2.label === item.label).length > 0)}
          options={options}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {error !== "" && (
          <p className="text-red-500 text-xs italic mt-2">{error}</p>
        )}
      </div>
    </div>
  );
});

TextMultiSelectInput.defaultProps = {
  validator: () => {
    return true;
  },
  font: "font-normal text-sm",
  width: "w-full",
  apiFunction: async function () { },
  mapFunction: (entity) => {
    return {
      value: entity.name,
      label: entity.name,
    };
  }
};

export default TextMultiSelectInput;
