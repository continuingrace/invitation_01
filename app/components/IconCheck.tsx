type IconCheckProps = { className?: string };

export default function IconCheck({ className = "" }: IconCheckProps) {
  return <span aria-hidden="true" className={`ds-icon ds-icon-check ${className}`.trim()}>✓</span>;
}
