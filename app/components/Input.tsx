import { InputHTMLAttributes } from "react";
import InputField from "@/app/components/InputField";
import Label from "@/app/components/Label";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean; className?: string };

export default function Input({ label, required = true, className = "", id, ...props }: InputProps) {
  return <label className={`ds-field ${className}`.trim()} htmlFor={id}><Label required={required}>{label}</Label><InputField id={id} required={required} {...props} /></label>;
}
