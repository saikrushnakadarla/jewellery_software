import React from "react";
import "./Inputfield.css";

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  readOnly,
  onChange,
  options = [],
}) => {
  return (
    <div className="input-field-container">
      <label className="input-label1">{label}</label>
      {type === "select" ? (
        <select
          className="styled-input1"
          value={value}
          onChange={onChange}
          disabled={readOnly}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="styled-input"
          type={type}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
