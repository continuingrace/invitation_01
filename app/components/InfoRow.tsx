type InfoRowProps = { label: string; value: string; type?: "inline" | "spread"; className?: string };

export default function InfoRow({ label, value, type = "inline", className = "" }: InfoRowProps) {
  return <div className={`ds-info-row ds-info-row-${type} ${className}`.trim()}><span className={type === "inline" ? "type-label-lg" : "type-body-md"}>{label}</span>{type === "inline" && <span aria-hidden="true" className="ds-info-divider" />}{type === "inline" ? <strong className="type-label-lg">{value}</strong> : <strong className="type-label-md">{value}</strong>}</div>;
}
