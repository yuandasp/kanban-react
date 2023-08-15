import React from "react";

function Button({ text = "Submit", color = "blue" }) {
  const getColorButton = () => {
    if (color === "red") {
      return "bg-red-600";
    } else if (color === "yellow") {
      return "bg-yellow-600";
    } else if (color === "gray") {
      return "bg-slate-200";
    }
    return "bg-blue-600";
  };

  return (
    <button
      className={`w-full ${getColorButton()} text-white font-bold py-2 px-12 rounded-md`}
    >
      {text}
    </button>
  );
}

export default Button;
