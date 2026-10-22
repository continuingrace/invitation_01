import Button from "@/app/components/Button";

type CopyLinkFieldProps = { title: string; description: string; value: string; onCopy: () => void; copied?: boolean; className?: string };

export default function CopyLinkField({ title, description, value, onCopy, copied = false, className = "" }: CopyLinkFieldProps) {
  return <section className={`ds-copy-link-field ${className}`.trim()}><h2 className="type-label-lg">{title}</h2><div><input aria-label={title} className="ds-copy-link-input type-body-lg" readOnly value={value} /><Button size="sm" onClick={onCopy}>{copied ? "복사 완료" : "복사"}</Button></div><p className="type-caption-md">{description}</p></section>;
}
