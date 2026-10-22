import Link from "next/link";
import { timingSafeEqual } from "node:crypto";
import { notFound } from "next/navigation";
import { formatInvitationDate, getInvitation, getRsvps } from "@/lib/invitations";
import { demoInvitation, demoRsvps, emptyInvitation, emptyRsvps } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default async function ResponsesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string | string[] }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const isDemoRoute = id === "demo" || id === demoInvitation.id;
  const isEmptyRoute = id === "empty";
  const isTestRoute = isDemoRoute || isEmptyRoute;
  const invitation = isDemoRoute
    ? demoInvitation
    : isEmptyRoute
      ? emptyInvitation
      : await getInvitation(id);
  if (!invitation) notFound();

  if (!isTestRoute) {
    const providedKey = typeof query.key === "string" ? query.key : "";
    const expectedKey = invitation.responseKey;
    const providedKeyBytes = Buffer.from(providedKey);
    const expectedKeyBytes = Buffer.from(expectedKey);
    const hasValidKey = providedKeyBytes.length === expectedKeyBytes.length && timingSafeEqual(providedKeyBytes, expectedKeyBytes);
    if (!hasValidKey) notFound();
  }

  const responses = isDemoRoute ? demoRsvps : isEmptyRoute ? emptyRsvps : await getRsvps(id);

  const attendingResponses = responses.filter((response) => response.attending);
  const declinedResponses = responses.filter((response) => !response.attending);
  const attendeeTotal = attendingResponses.length + attendingResponses.reduce((total, response) => total + response.companionCount, 0);

  return (
    <main className="responses-page">
      <header className="topbar"><Link className="brand" href="/create">모임의 온도<span>초대장</span></Link><Link className="topbar-link" href={`/i/${id}`}>초대장 보기 ↗</Link></header>
      <section className="responses-heading">
        <p className="eyebrow">GUEST LIST</p>
        <h1>응답 현황</h1>
        <p>{invitation.title}</p>
        <div className="responses-event-meta"><span>{formatInvitationDate(invitation.dateTime)}</span><span>{invitation.location}</span></div>
      </section>

      <section className="stats-grid" aria-label="참석 응답 요약">
        <article className="stat-card stat-highlight"><span>참석 인원</span><strong>{attendeeTotal}<small>명</small></strong><p>본인 포함 총 인원</p></article>
        <article className="stat-card"><span>참석</span><strong>{attendingResponses.length}<small>팀</small></strong><p>참석한다고 답했어요</p></article>
        <article className="stat-card"><span>불참</span><strong>{declinedResponses.length}<small>팀</small></strong><p>마음만 함께한다고 답했어요</p></article>
      </section>

      <section className="guest-list-panel">
        <div className="guest-list-heading"><div><h2>게스트 응답</h2><p>총 {responses.length}개의 응답</p></div><span className="list-date">최근 응답순</span></div>
        {responses.length ? (
          <div className="response-list">
            {responses.map((response) => (
              <article className="response-row" key={response.id}>
                <div className={`response-avatar ${response.attending ? "avatar-attending" : "avatar-declined"}`}>{response.name.slice(0, 1)}</div>
                <div className="response-person"><strong>{response.name}</strong><span>{new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(response.createdAt))}</span></div>
                <span className={`status-pill ${response.attending ? "status-yes" : "status-no"}`}>{response.attending ? "참석" : "불참"}</span>
                <strong className="response-count">{response.attending ? (response.companionCount > 0 ? `본인 + ${response.companionCount}명` : "본인만") : "—"}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-responses"><div className="empty-icon">♡</div><h3>아직 도착한 응답이 없어요</h3><p>초대장 링크를 공유하면 게스트의 답변이 여기에 모여요.</p><Link className="text-link" href={`/i/${id}`}>초대장 확인하기 ↗</Link></div>
        )}
      </section>
      <footer className="site-footer"><span>모임의 온도</span><span>작은 순간을 더 따뜻하게</span></footer>
    </main>
  );
}
