type IconNoneProps = { className?: string };

export default function IconNone({ className = "" }: IconNoneProps) {
  return <span aria-hidden="true" className={`ds-icon ds-icon-none ${className}`.trim()} />;
}
