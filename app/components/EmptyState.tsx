type EmptyStateProps = { title?: string; description?: string; className?: string };

export default function EmptyState({ title = "아직 응답이 없어요", description = "초대장 링크를 공유해 보세요.", className = "" }: EmptyStateProps) {
  return <section className={`ds-empty-state ${className}`.trim()}><h2 className="type-heading-md">{title}</h2><p className="type-caption-md">{description}</p></section>;
}
