import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvitation, formatInvitationDate } from "@/lib/invitations";
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

  return (
    <main className="guest-page">
      <Link className="guest-brand" href="/create">모임의 온도 <span>초대장</span></Link>
      <article className="guest-invitation">
        <div className="guest-hero"><div className="sun-shape"/><span>YOU ARE INVITED</span><div className="art-line art-line-one"/><div className="art-line art-line-two"/><div className="flower flower-one">✳</div><div className="flower flower-two">✳</div></div>
        <div className="guest-content">
          <p className="preview-overline">A DAY TO REMEMBER</p>
          <h1>{invitation.title}</h1>
          <div className="preview-divider">✦</div>
          <p className="guest-message">{invitation.message}</p>
          <div className="guest-details">
            <div className="detail-icon">◷</div><div><span>DATE & TIME</span><p>{formatInvitationDate(invitation.dateTime)}</p></div>
            <div className="detail-icon">⌖</div><div><span>PLACE</span><p>{invitation.location}</p></div>
          </div>
          <RsvpForm invitationId={id} />
        </div>
        <div className="preview-footer">WITH LOVE, SEE YOU THERE</div>
      </article>
      <footer className="guest-footer">모임의 온도 · 소중한 초대에 응답해 주세요</footer>
    </main>
  );
}
