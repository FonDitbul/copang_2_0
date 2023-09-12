import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...attributes }: Props) {
  console.log(JSON.stringify(attributes))
  let buttonClassName = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
  if(attributes.disabled === true) {
    buttonClassName ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-not-allowed"
  }
  return (
    <button
      type="button"
      className={buttonClassName}
      {...attributes}
    >
      {children}
    </button>
  );
}
