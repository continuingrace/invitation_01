import { timingSafeEqual } from "node:crypto";
import { notFound } from "next/navigation";
import { formatInvitationDate, getInvitation, getRsvps } from "@/lib/invitations";

export const dynamic = "force-dynamic";

function StatCard({ label, value, emphasis = false }: { label: string; value: number; emphasis?: boolean }) {
  return <article className={`figma-stat-card ${emphasis ? "figma-stat-card-emphasis" : ""}`}><span className="type-body-md">{label}</span><strong className="type-title-lg">{value}<small>명</small></strong></article>;
}

export default async function ResponsesPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ key?: string | string[] }> }) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const invitation = await getInvitation(id);
  if (!invitation) notFound();
  const providedKey = typeof query.key === "string" ? query.key : "";
  const providedKeyBytes = Buffer.from(providedKey);
  const expectedKeyBytes = Buffer.from(invitation.responseKey);
  const hasValidKey = providedKeyBytes.length === expectedKeyBytes.length && timingSafeEqual(providedKeyBytes, expectedKeyBytes);
  if (!hasValidKey) notFound();

  const responses = await getRsvps(id);
  const attendingResponses = responses.filter((response) => response.attending);
  const declinedResponses = responses.filter((response) => !response.attending);
  const attendeeTotal = attendingResponses.length + attendingResponses.reduce((total, response) => total + response.companionCount, 0);
  return <main className="figma-responses-page">
    <header className="figma-mobile-nav"><span aria-hidden="true" /><h1 className="type-heading-md">응답 현황</h1><span aria-hidden="true" /></header>
    <section className="figma-responses-content">
      <header className="figma-responses-header"><p className="type-body-md">{invitation.title}</p><h2 className="type-title-lg">응답 현황</h2><dl><div><dt>일시</dt><dd>{formatInvitationDate(invitation.dateTime)}</dd></div><div><dt>장소</dt><dd>{invitation.location}</dd></div></dl></header>
      <section className="figma-stat-grid" aria-label="참석 응답 요약"><StatCard label="참석" value={attendingResponses.length} /><StatCard label="불참" value={declinedResponses.length} /><StatCard label="참석 인원 합계" value={attendeeTotal} emphasis /></section>
      <section className="figma-response-list-section"><div className="figma-response-list-heading"><h3 className="type-heading-md">게스트 응답</h3><span className="type-body-md">총 {responses.length}개</span></div>{responses.length ? <ul className="figma-response-list">{responses.map((response) => <li key={response.id}><div><strong className="type-label-lg">{response.name}</strong><span className="type-body-md">{response.attending ? "참석" : "불참"}{response.attending && ` · 동반 ${response.companionCount}명`}</span></div><b className={`figma-response-status ${response.attending ? "is-attending" : ""}`}>{response.attending ? "참석" : "불참"}</b></li>)}</ul> : <div className="figma-empty-responses"><h3 className="type-heading-lg">아직 응답이 없어요</h3><p className="type-body-md">초대장 링크를 공유하면 게스트의 답변이 여기에 모여요.</p></div>}</section>
    </section>
  </main>;
}
