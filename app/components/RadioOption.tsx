import { InputHTMLAttributes } from "react";
import Radio from "@/app/components/Radio";

type RadioOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; className?: string };

export default function RadioOption({ label, className = "", id, ...props }: RadioOptionProps) {
  return <label className={`ds-radio-option type-label-md ${className}`.trim()} htmlFor={id}><Radio id={id} {...props} /><span>{label}</span></label>;
}
