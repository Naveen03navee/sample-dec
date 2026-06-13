import React from "react";

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg mb-3 focus:outline-green-500"
    />
  );
};

export default InputField;