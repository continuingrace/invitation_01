import { TextareaHTMLAttributes } from "react";
import Label from "@/app/components/Label";
import TextareaField from "@/app/components/TextareaField";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; required?: boolean; rows?: 2 | 4; className?: string };

export default function Textarea({ label, required = true, rows = 4, className = "", id, ...props }: TextareaProps) {
  return <label className={`ds-field ${className}`.trim()} htmlFor={id}><Label required={required}>{label}</Label><TextareaField id={id} required={required} rows={rows} {...props} /></label>;
}
