import React  from "react";
import "../css/style.css";

const TextInput = ({ value, name, placeholder, type, onChange }) => (
  <div className="form-group">
    <input
      type={type}
      value={value}
      name={name}
      className="form-control custom-text-input"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default TextInput;