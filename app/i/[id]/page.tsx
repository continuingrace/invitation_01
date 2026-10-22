import { notFound } from "next/navigation";
import Image from "@/app/components/Image";
import InfoRow from "@/app/components/InfoRow";
import { formatInvitationDate, getInvitation } from "@/lib/invitations";
import { demoInvitation } from "@/lib/mock";
import RsvpForm from "./rsvp-form";

export const dynamic = "force-dynamic";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isDemoInvitation = id === demoInvitation.id;
  const invitation = isDemoInvitation ? demoInvitation : await getInvitation(id);
  if (!invitation) notFound();

  const formattedDate = formatInvitationDate(invitation.dateTime);

  return (
    <main className="figma-guest-page">
      <section className="figma-guest-cover">
        <div className="figma-guest-cover-content">
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
        </div>
      </section>

      <section className="figma-guest-body" aria-label="초대 내용">
        <div className="figma-guest-body-content">
          <Image alt="" aria-hidden="true" size="flag" src="/figma/invitation-flag.png" />
          <p className="type-body-compact">{invitation.message}</p>
        </div>
      </section>

      <section className="figma-event-info" aria-label="행사 정보">
        <div className="figma-event-info-content">
          <div className="figma-event-info-card">
            <InfoRow label="일시" value={formattedDate} />
            <InfoRow label="장소" value={invitation.location} />
          </div>
        </div>
      </section>

      <section className="figma-rsvp-section">
        <div className="figma-rsvp-content">
          <RsvpForm invitationId={id} isDemoInvitation={isDemoInvitation} />
        </div>
      </section>
    </main>
  );
}
