"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import Button from "@/app/components/Button";
import Image2_1 from "@/app/components/Image2_1";

type InvitationDraft = { title: string; dateTime: string; location: string; message: string };
const emptyDraft: InvitationDraft = { title: "", dateTime: "", location: "", message: "" };

function formatDate(value: string) {
  if (!value) return "일시를 입력해 주세요";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "일시를 입력해 주세요";
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Seoul" }).format(date);
}

function CopyLinkField({ label, description, value, copied, onCopy }: { label: string; description: string; value: string; copied: boolean; onCopy: () => void }) {
  return <section className="figma-copy-link"><h3 className="type-label-lg">{label}</h3><div className="figma-copy-link-row"><input aria-label={label} className="type-body-lg" readOnly value={value} /><Button size="sm" onClick={onCopy}>{copied ? "복사 완료" : "복사"}</Button></div><p className="type-caption-md">{description}</p></section>;
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
  const update = (field: keyof InvitationDraft, value: string) => setDraft((current) => ({ ...current, [field]: value }));
  async function copyLink(label: string, value: string) { try { await navigator.clipboard.writeText(value); setCopied(label); window.setTimeout(() => setCopied(""), 1800); } catch { setError("링크를 복사하지 못했어요. 주소를 직접 선택해 복사해 주세요."); } }
  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setIsSubmitting(true);
    try {
      const response = await fetch("/api/invitations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const result = (await response.json()) as { id?: string; responseKey?: string; error?: string };
      if (!response.ok || !result.id || !result.responseKey) throw new Error(result.error ?? "초대장을 발행하지 못했어요.");
      setCreatedId(result.id); setResponseKey(result.responseKey);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "초대장을 발행하지 못했어요."); } finally { setIsSubmitting(false); }
  }
  return <main className="figma-create-page">
    <header className="figma-mobile-nav"><span aria-hidden="true" /><h1 className="type-heading-md">초대장 만들기</h1><span aria-hidden="true" /></header>
    {createdId ? <section className="figma-published" aria-live="polite"><div className="figma-success-icon" aria-hidden="true">✓</div><div className="figma-section-header"><p className="type-body-md">초대장 발행 완료</p><h2 className="type-title-lg">초대장을 만들었어요</h2><p className="type-body-md">링크를 복사해 게스트와 함께 준비하는 분에게 공유해 주세요.</p></div><div className="figma-link-stack"><CopyLinkField label="초대장 링크" description="게스트에게 공유하는 링크예요." value={invitationUrl} copied={copied === "invitation"} onCopy={() => copyLink("invitation", invitationUrl)} /><CopyLinkField label="응답 현황 링크" description="응답 현황을 확인하는 링크예요." value={responsesUrl} copied={copied === "responses"} onCopy={() => copyLink("responses", responsesUrl)} /></div>{error && <p className="figma-form-error type-body-md" role="alert">{error}</p>}<Button className="figma-create-primary" size="lg" onClick={() => { setCreatedId(""); setResponseKey(""); setDraft(emptyDraft); }}>새 초대장 만들기</Button></section> :
    <div className="figma-create-content"><form className="figma-create-form" onSubmit={publish}>
      <label className="figma-create-field" htmlFor="title"><span className="type-label-lg">제목 <em>필수</em></span><textarea id="title" rows={2} maxLength={100} required placeholder={"예) 허들링 클럽 2번째\n오프라인 밋업"} value={draft.title} onChange={(event) => update("title", event.target.value)} /><small className="type-caption-md">엔터로 줄을 나눌 수 있어요 · 최대 2줄</small></label>
      <label className="figma-create-field" htmlFor="dateTime"><span className="type-label-lg">일시 <em>필수</em></span><input id="dateTime" type="datetime-local" required value={draft.dateTime} onChange={(event) => update("dateTime", event.target.value)} /></label>
      <label className="figma-create-field" htmlFor="location"><span className="type-label-lg">장소 <em>필수</em></span><input id="location" maxLength={240} required placeholder="장소명과 주소를 입력해 주세요" value={draft.location} onChange={(event) => update("location", event.target.value)} /></label>
      <label className="figma-create-field" htmlFor="message"><span className="type-label-lg">본문 <em>필수</em></span><textarea id="message" rows={4} maxLength={2000} required placeholder="초대의 말을 입력해 주세요" value={draft.message} onChange={(event) => update("message", event.target.value)} /></label>
      {error && <p className="figma-form-error type-body-md" role="alert">{error}</p>}<Button className="figma-create-primary" size="lg" type="submit" disabled={isSubmitting}>{isSubmitting ? "초대장을 발행하고 있어요" : "초대장 발행하기"}</Button>
    </form><section className="figma-create-preview" aria-label="초대장 미리보기"><div className="figma-preview-cover"><Image src="/figma/invitation-character.png" width={201} height={201} alt="" priority /><p className="type-body-md">{formatDate(draft.dateTime)}</p><h2 className="type-title-lg">{draft.title || "초대장 제목"}</h2></div><div className="figma-preview-body"><Image2_1 className="figma-preview-flag" alt="" /><p className="figma-preview-message type-body-compact">{draft.message || "초대의 말이 여기에 표시돼요."}</p><div><span>일시</span><strong>{formatDate(draft.dateTime)}</strong></div><div><span>장소</span><strong>{draft.location || "장소를 입력해 주세요"}</strong></div></div></section></div>}
  </main>;
}
