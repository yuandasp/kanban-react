import React from "react";

function Input({ type = "text", name, placeholder = "" }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full border-solid border-slate-200 border-2 py-1 px-4 mb-4 rounded-sm"
    />
  );
}

export default Input;
