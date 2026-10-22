type LabelProps = { children: string; required?: boolean; className?: string };

export default function Label({ children, required = true, className = "" }: LabelProps) {
  return <span className={`ds-label ${className}`.trim()}><span>{children}</span>{required && <span className="ds-label-required">필수</span>}</span>;
}
