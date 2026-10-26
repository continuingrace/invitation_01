import { notFound } from "next/navigation";
import FallingLeaf from "@/app/components/FallingLeaf";
import Image from "@/app/components/Image";
import Image2 from "@/app/components/Image2";
import Image2_1 from "@/app/components/Image2_1";
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
  const usesInvitationCover2 = invitation.coverVariant === "invitationCover2";

  return (
    <main className="figma-guest-page">
      <section className={`figma-guest-cover${usesInvitationCover2 ? " figma-guest-cover--invitation-cover2" : ""}`}>
        {usesInvitationCover2 && (
          <div className="figma-invitation-cover2-leaves" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => {
              const leafVariant = (index % 6) + 1;
              const leafRound = Math.floor(index / 6) + 1;
              const leafType = index % 2 === 0 ? "maple" : "ginkgo";

              return (
              <span className={`figma-invitation-cover2-leaf figma-invitation-cover2-leaf--${leafType} figma-invitation-cover2-leaf--${leafVariant} figma-invitation-cover2-leaf--round-${leafRound}`} key={index}>
                <FallingLeaf type={leafType} />
              </span>
              );
            })}
          </div>
        )}
        <div className={`figma-guest-cover-content${usesInvitationCover2 ? " figma-guest-cover-content--invitation-cover2" : ""}`}>
          {invitation.subtitle && <p className="figma-guest-subtitle type-body-md">{invitation.subtitle}</p>}
          <h1 className="type-title-lg">{invitation.title}</h1>
          {usesInvitationCover2 ? (
            <span className="figma-cover-image-hover" tabIndex={0} aria-label="남산하늘길 산책 모임 일러스트">
              <Image2 alt="" aria-hidden="true" src="/figma/invitation-cover2-image.png" />
              <Image2 className="figma-cover-image-hover-image" alt="" aria-hidden="true" src="/figma/Image2hover.png" />
            </span>
          ) : (
            <Image alt="" aria-hidden="true" size="character" src="/figma/invitation-character.png" />
          )}
          <div className={`figma-cover-detail${usesInvitationCover2 ? " figma-cover-detail--invitation-cover2" : ""}`}>
            <span className="type-caption-md">일시</span>
            <p className="type-body-md">{formattedDate}</p>
          </div>
          <div className={`figma-cover-detail${usesInvitationCover2 ? " figma-cover-detail--invitation-cover2" : ""}`}>
            <span className="type-caption-md">장소</span>
            <p className="type-body-md">{invitation.location}</p>
          </div>
        </div>
      </section>

      <section className="figma-guest-body" aria-label="초대 내용">
        <div className="figma-guest-body-content">
          <Image2_1 alt="" aria-hidden="true" />
          {invitation.introductionTitle && <h2 className="figma-introduction-title type-heading-lg">{invitation.introductionTitle}</h2>}
          <div className="figma-invitation-message type-body-compact">
            {invitation.message.split("\n\n").map((paragraph, index) => (
              <p key={`${index}-${paragraph}`}>
                {index > 0 && <span className="figma-acorn-icon" aria-hidden="true">🌰</span>}
                {paragraph}
              </p>
            ))}
          </div>
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
          <RsvpForm invitationId={id} />
        </div>
      </section>
    </main>
  );
}
