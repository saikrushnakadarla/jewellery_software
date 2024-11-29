import React from "react";
import "./InputField.css";

const InputField = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  readOnly, 
  onChange, 
  name, 
  options = [] 
}) => {
  return (
    <div className="input-field-container">
      <label className="input-label">{label}</label>
      {type === "select" ? (
        <select
          className="styled-input"
          name={name}
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
          name={name}
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
