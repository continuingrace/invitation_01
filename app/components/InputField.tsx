import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ className = "", ...props }: InputFieldProps) {
  return <input {...props} className={`ds-input-field type-body-lg ${className}`.trim()} />;
}
