type StatCardProps = { label: string; value: string; highlight?: boolean; className?: string };

export default function StatCard({ label, value, highlight = false, className = "" }: StatCardProps) {
  return <section className={`ds-stat-card ${highlight ? "ds-stat-card-highlight" : ""} ${className}`.trim()}><span className="type-caption-md">{label}</span><strong className="type-title-lg">{value}</strong></section>;
}
