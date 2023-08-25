"use client";
import { Dispatch, SetStateAction } from "react";
import valueDuplicateButton from "@/components/Account/valueDuplicateButton";
import ValueDuplicateButton from "@/components/Account/valueDuplicateButton";

export interface ISignUpInput {
  id: string;
  text: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isDuplicateButton: boolean;
  type: string;
}
export default function SignUpInput({
  id,
  text,
  value,
  setValue,
  isDuplicateButton,
  type = "text",
}: ISignUpInput) {
  let button = <ValueDuplicateButton value={value} />;
  if (!isDuplicateButton) {
    button = <></>;
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white"
      >
        {text}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={text}
        onChange={(e) => setValue(e.target.value)}
      />
      {button}
    </div>
  );
}
