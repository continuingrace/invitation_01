type IconPlusProps = { className?: string };

export default function IconPlus({ className = "" }: IconPlusProps) {
  return <span aria-hidden="true" className={`ds-icon ds-icon-action ${className}`.trim()}>+</span>;
}
