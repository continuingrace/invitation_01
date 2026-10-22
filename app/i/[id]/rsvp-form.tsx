"use client";

import { FormEvent, useState } from "react";
import Button from "@/app/components/Button";
import InfoRow from "@/app/components/InfoRow";
import InputField from "@/app/components/InputField";
import Label from "@/app/components/Label";
import RadioOption from "@/app/components/RadioOption";
import RSVPCard from "@/app/components/RSVPCard";
import Stepper from "@/app/components/Stepper";

export default function RsvpForm({
  invitationId,
  isDemoInvitation = false,
}: {
  invitationId: string;
  isDemoInvitation?: boolean;
}) {
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
      if (isDemoInvitation) {
        setIsComplete(true);
        return;
      }

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
      <RSVPCard className="figma-rsvp-card" state="done">
        <div className="figma-rsvp-result">
          <InfoRow label="이름" type="spread" value={name} />
          <InfoRow label="참석 여부" type="spread" value={attending ? "참석" : "불참"} />
          <InfoRow label="동반 인원" type="spread" value={`${attending ? companionCount : 0}명`} />
        </div>
      </RSVPCard>
    );
  }

  return (
    <RSVPCard className="figma-rsvp-card">
      <form className="figma-rsvp-form" onSubmit={submit}>
        <div className="figma-rsvp-field">
          <Label>이름</Label>
          <InputField
            autoComplete="name"
            id="guest-name"
            maxLength={80}
            placeholder="이름을 입력해주세요"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <fieldset className="figma-attendance-fieldset">
          <legend><Label>참석 여부</Label></legend>
          <div className="figma-attendance-options">
            <RadioOption checked={attending === true} id="attending" label="참석" name="attendance" onChange={() => setAttending(true)} />
            <RadioOption checked={attending === false} id="declined" label="불참" name="attendance" onChange={() => setAttending(false)} />
          </div>
        </fieldset>

        {attending !== false && (
          <div className="figma-rsvp-field">
            <Label>동반 인원</Label>
            <Stepper
              value={companionCount}
              onDecrease={() => setCompanionCount((count) => Math.max(0, count - 1))}
              onIncrease={() => setCompanionCount((count) => Math.min(19, count + 1))}
            />
            <p className="type-caption-md">본인을 제외하고 함께 오는 인원이에요.</p>
          </div>
        )}

        {error && <p className="figma-rsvp-error type-caption-md" role="alert">{error}</p>}
        <Button className="figma-rsvp-submit" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "전달하고 있어요…" : "참석 여부 보내기"}
        </Button>
      </form>
    </RSVPCard>
  );
}
