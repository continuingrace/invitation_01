import AttendanceBadge from "@/app/components/AttendanceBadge";

type ResponseRowProps = { name: string; status: boolean; companions?: number; className?: string };

export default function ResponseRow({ name, status, companions = 0, className = "" }: ResponseRowProps) {
  return <article className={`ds-response-row ${className}`.trim()}><strong className="type-label-lg">{name}</strong><AttendanceBadge status={status} /><span className="type-body-md">동반 {companions}명</span></article>;
}
