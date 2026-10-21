"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type InvitationDraft = {
  title: string;
  dateTime: string;
  location: string;
  message: string;
};

const emptyDraft: InvitationDraft = { title: "", dateTime: "", location: "", message: "" };

function formattedDate(value: string) {
  if (!value) return "일시를 입력해 주세요";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "일시를 입력해 주세요";
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(date);
}

export default function CreatePage() {
  const [draft, setDraft] = useState(emptyDraft);
  const [createdId, setCreatedId] = useState("");
  const [responseKey, setResponseKey] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invitationUrl = createdId && typeof window !== "undefined" ? `${window.location.origin}/i/${createdId}` : "";
  const responsesUrl = createdId && responseKey && typeof window !== "undefined" ? `${window.location.origin}/i/${createdId}/responses?key=${responseKey}` : "";

  function update(field: keyof InvitationDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function copyLink(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setError("링크를 복사하지 못했어요. 주소를 직접 선택해 복사해 주세요.");
    }
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const result = (await response.json()) as { id?: string; responseKey?: string; error?: string };
      if (!response.ok || !result.id || !result.responseKey) throw new Error(result.error ?? "초대장을 발행하지 못했어요.");
      setCreatedId(result.id);
      setResponseKey(result.responseKey);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "초대장을 발행하지 못했어요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" href="/create" aria-label="초대장 만들기 홈">모임의 온도<span>초대장</span></Link>
        <span className="topbar-note">마음을 전하는 가장 간단한 방법</span>
      </header>

      <section className="create-heading">
        <p className="eyebrow">INVITATION STUDIO</p>
        <h1>초대장을 만들어 볼까요?</h1>
        <p>필요한 내용만 채우면, 바로 공유할 수 있어요.</p>
      </section>

      {createdId ? (
        <section className="published-panel" aria-live="polite">
          <div className="success-mark">✓</div>
          <p className="eyebrow">READY TO SHARE</p>
          <h2>초대장이 발행됐어요</h2>
          <p className="published-copy">초대장 링크를 게스트에게, 응답 현황 링크를 함께 준비하는 분에게 보내세요.</p>
          <div className="share-link-card">
            <div><span className="share-label">게스트 초대장</span><input readOnly value={invitationUrl} aria-label="게스트 초대장 링크" /></div>
            <button className="button button-dark" onClick={() => copyLink("invitation", invitationUrl)}>{copied === "invitation" ? "복사 완료" : "링크 복사"}</button>
          </div>
          <div className="share-link-card">
            <div><span className="share-label">응답 현황</span><input readOnly value={responsesUrl} aria-label="응답 현황 링크" /></div>
            <button className="button button-light" onClick={() => copyLink("responses", responsesUrl)}>{copied === "responses" ? "복사 완료" : "링크 복사"}</button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="published-actions">
            <Link className="text-link" href={`/i/${createdId}`}>초대장 미리 보기 ↗</Link>
            <Link className="text-link" href={`/i/${createdId}/responses?key=${responseKey}`}>응답 현황 보기 ↗</Link>
          </div>
          <button className="button button-quiet" onClick={() => { setCreatedId(""); setDraft(emptyDraft); }}>새 초대장 만들기</button>
        </section>
      ) : (
        <div className="create-grid">
          <form className="form-panel" onSubmit={publish}>
            <div className="panel-heading"><span className="step-number">01</span><div><h2>초대장 내용</h2><p>게스트에게 전할 정보를 적어 주세요.</p></div></div>

            <label className="field-label" htmlFor="title">초대장 제목 <span>필수</span></label>
            <input id="title" className="text-input" maxLength={100} placeholder="예: 우리의 작은 결혼식에 초대합니다" required value={draft.title} onChange={(event) => update("title", event.target.value)} />

            <label className="field-label" htmlFor="dateTime">날짜와 시간 <span>필수</span></label>
            <input id="dateTime" className="text-input" type="datetime-local" required value={draft.dateTime} onChange={(event) => update("dateTime", event.target.value)} />

            <label className="field-label" htmlFor="location">장소 <span>필수</span></label>
            <input id="location" className="text-input" maxLength={240} placeholder="장소명과 주소를 입력해 주세요" required value={draft.location} onChange={(event) => update("location", event.target.value)} />

            <label className="field-label" htmlFor="message">초대의 말 <span>필수</span></label>
            <textarea id="message" className="text-input text-area" maxLength={2000} placeholder="함께 나누고 싶은 마음을 적어 주세요." required value={draft.message} onChange={(event) => update("message", event.target.value)} />
            <div className="character-count">{draft.message.length} / 2,000</div>

            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-dark publish-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "초대장을 준비하고 있어요…" : "초대장 발행하기"}<span>↗</span></button>
            <p className="form-footnote">발행 후에는 내용 수정 기능이 제공되지 않아요.</p>
          </form>

          <aside className="preview-column">
            <div className="preview-label"><span>LIVE PREVIEW</span><span>실시간 미리보기</span></div>
            <article className="invitation-preview">
              <div className="preview-art"><div className="sun-shape"/><span>YOU ARE INVITED</span><div className="art-line art-line-one"/><div className="art-line art-line-two"/><div className="flower flower-one">✳</div><div className="flower flower-two">✳</div></div>
              <div className="preview-content">
                <p className="preview-overline">A DAY TO REMEMBER</p>
                <h2>{draft.title || "초대장 제목이 여기에 보여요"}</h2>
                <div className="preview-divider">✦</div>
                <p className="preview-message">{draft.message || "초대의 말이 여기에 보여요. 소중한 마음을 전해 보세요."}</p>
                <div className="preview-details"><div><span>DATE & TIME</span><p>{formattedDate(draft.dateTime)}</p></div><div><span>PLACE</span><p>{draft.location || "장소를 입력해 주세요"}</p></div></div>
              </div>
              <div className="preview-footer">WITH LOVE, SEE YOU THERE</div>
            </article>
            <p className="preview-caption">초대장은 모바일 화면에 맞춰 자동으로 보여요.</p>
          </aside>
        </div>
      )}
      <footer className="site-footer"><span>모임의 온도</span><span>작은 순간을 더 따뜻하게</span></footer>
    </main>
  );
}
