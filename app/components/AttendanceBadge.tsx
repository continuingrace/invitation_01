type AttendanceBadgeProps = { status: boolean; className?: string };

export default function AttendanceBadge({ status, className = "" }: AttendanceBadgeProps) {
  return <span className={`ds-attendance-badge ds-attendance-badge-${status ? "yes" : "no"} type-label-md ${className}`.trim()}>{status ? "참석" : "불참"}</span>;
}
