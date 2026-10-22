import { InputHTMLAttributes } from "react";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Radio({ className = "", ...props }: RadioProps) {
  return <input {...props} className={`ds-radio ${className}`.trim()} type="radio" />;
}
