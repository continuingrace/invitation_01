import { notFound } from "next/navigation";
import Image from "@/app/components/Image";
import InfoRow from "@/app/components/InfoRow";
import { formatInvitationDate, getInvitation } from "@/lib/invitations";
import RsvpForm from "./rsvp-form";

export const dynamic = "force-dynamic";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invitation = await getInvitation(id);
  if (!invitation) notFound();

  const formattedDate = formatInvitationDate(invitation.dateTime);

  return (
    <main className="figma-guest-page">
      <section className="figma-guest-cover">
        <h1 className="type-title-lg">{invitation.title}</h1>
        <Image alt="" aria-hidden="true" size="character" src="/figma/invitation-character.png" />
        <div className="figma-cover-detail">
          <span className="type-caption-md">일시</span>
          <p className="type-body-md">{formattedDate}</p>
        </div>
        <div className="figma-cover-detail">
          <span className="type-caption-md">장소</span>
          <p className="type-body-md">{invitation.location}</p>
        </div>
      </section>

      <section className="figma-guest-body" aria-label="초대 내용">
        <Image alt="" aria-hidden="true" size="flag" src="/figma/invitation-flag.png" />
        <p className="type-body-compact">{invitation.message}</p>
      </section>

      <section className="figma-event-info" aria-label="행사 정보">
        <div className="figma-event-info-card">
          <InfoRow label="일시" value={formattedDate} />
          <InfoRow label="장소" value={invitation.location} />
        </div>
      </section>

      <section className="figma-rsvp-section">
        <RsvpForm invitationId={id} />
      </section>
    </main>
  );
}
