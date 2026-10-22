type SectionHeaderProps = { subtitle?: string; title?: string; description?: string; className?: string };

export default function SectionHeader({ subtitle, title, description, className = "" }: SectionHeaderProps) {
  return <section className={`ds-section-header ${className}`.trim()}>{subtitle && <p className="type-body-md">{subtitle}</p>}{title && <h2 className="type-title-lg">{title}</h2>}{description && <p className="type-body-md">{description}</p>}</section>;
}
