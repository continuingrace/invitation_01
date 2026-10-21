"use client";

import { FormEvent, useState } from "react";

export default function RsvpForm({ invitationId }: { invitationId: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [companionCount, setCompanionCount] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (attending === null) {
      setError("참석 여부를 선택해 주세요.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/invitations/${invitationId}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, companionCount: attending ? companionCount : 0 }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "응답을 보내지 못했어요.");
      setIsComplete(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "응답을 보내지 못했어요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <section className="rsvp-complete" aria-live="polite">
        <div className="success-mark">✓</div>
        <h2>응답을 전했어요</h2>
        <p>{name}님, 소중한 답변 감사합니다.</p>
      </section>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={submit}>
      <div className="form-section-heading"><span className="step-number">RSVP</span><div><h2>참석 여부를 알려 주세요</h2><p>호스트에게 답변이 전달됩니다.</p></div></div>
      <label className="field-label" htmlFor="guest-name">이름 <span>필수</span></label>
      <input id="guest-name" className="text-input" autoComplete="name" maxLength={80} placeholder="이름을 입력해 주세요" required value={name} onChange={(event) => setName(event.target.value)} />

      <fieldset className="attendance-fieldset">
        <legend className="field-label">참석 여부 <span>필수</span></legend>
        <div className="attendance-options">
          <button type="button" className={`attendance-option ${attending === true ? "selected" : ""}`} aria-pressed={attending === true} onClick={() => setAttending(true)}><span className="option-icon">✓</span>참석할게요</button>
          <button type="button" className={`attendance-option ${attending === false ? "selected" : ""}`} aria-pressed={attending === false} onClick={() => setAttending(false)}><span className="option-icon">–</span>마음만 함께할게요</button>
        </div>
      </fieldset>

      {attending && <div className="guest-count-row"><div><label className="field-label" htmlFor="companion-count">동반 인원 <span>본인 제외</span></label><p>함께 오시는 분의 수를 입력해 주세요.</p></div><div className="stepper"><button type="button" aria-label="동반 인원 줄이기" onClick={() => setCompanionCount((count) => Math.max(0, count - 1))}>−</button><span>{companionCount}</span><button type="button" aria-label="동반 인원 늘리기" onClick={() => setCompanionCount((count) => Math.min(19, count + 1))}>+</button></div></div>}

      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-dark publish-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "전달하고 있어요…" : "응답 보내기"}<span>↗</span></button>
      <p className="form-footnote">입력한 이름과 참석 여부는 초대장 주인에게 보여요.</p>
    </form>
  );
}
