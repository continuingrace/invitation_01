import { ReactNode } from "react";
import SuccessIcon from "@/app/components/SuccessIcon";

type RSVPCardProps = { state?: "form" | "done"; title?: string; description?: string; children?: ReactNode; className?: string };

export default function RSVPCard({ state = "form", title = "참석 여부 알려주기", description = "이름과 참석 여부를 남겨주세요.", children, className = "" }: RSVPCardProps) {
  if (state === "done") return <section className={`ds-rsvp-card ds-rsvp-card-done ${className}`.trim()}><SuccessIcon /><h2 className="type-heading-lg">참석 여부를 보냈어요</h2><p className="type-body-md">호스트에게 응답이 전달됐어요.</p>{children}</section>;
  return <section className={`ds-rsvp-card ${className}`.trim()}><h2 className="type-heading-lg">{title}</h2><p className="type-caption-md">{description}</p>{children}</section>;
}
