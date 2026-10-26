import { InputHTMLAttributes } from "react";
import Radio from "@/app/components/Radio";

type RadioOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; className?: string };

export default function RadioOption({ label, className = "", id, ...props }: RadioOptionProps) {
  const isChecked = Boolean(props.checked);
  return <label className={`ds-radio-option type-label-md${isChecked ? " is-selected" : ""} ${className}`.trim()} htmlFor={id}><Radio id={id} {...props} /><span>{label}</span></label>;
}
