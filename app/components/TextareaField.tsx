import { TextareaHTMLAttributes } from "react";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextareaField({ className = "", ...props }: TextareaFieldProps) {
  return <textarea {...props} className={`ds-textarea-field type-body-lg ${className}`.trim()} />;
}
