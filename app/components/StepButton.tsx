import { ButtonHTMLAttributes, ReactNode } from "react";

type StepButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export default function StepButton({ children, className = "", type = "button", ...props }: StepButtonProps) {
  return <button {...props} className={`ds-step-button ${className}`.trim()} type={type}>{children}</button>;
}
