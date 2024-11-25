import React from "react";
import "./InputField.css";

const InputField = ({ label, type = "text", placeholder, value, readOnly, onChange }) => {
  return (
    <div className="input-field-container">
      <label className="input-label">{label}</label>
      <input
        className="styled-input"
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
