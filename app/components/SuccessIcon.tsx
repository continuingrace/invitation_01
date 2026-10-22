import IconCheck from "@/app/components/IconCheck";

type SuccessIconProps = { className?: string };

export default function SuccessIcon({ className = "" }: SuccessIconProps) {
  return <span aria-label="완료" className={`ds-success-icon ${className}`.trim()}><IconCheck /></span>;
}
