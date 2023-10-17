import Input from './Input';
import React from 'react';

export function CheckBox({ ...attributes }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      type="checkbox"
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      {...attributes}
    />
  );
}
