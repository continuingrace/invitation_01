type IconMinusProps = { className?: string };

export default function IconMinus({ className = "" }: IconMinusProps) {
  return <span aria-hidden="true" className={`ds-icon ds-icon-action ${className}`.trim()}>−</span>;
}
