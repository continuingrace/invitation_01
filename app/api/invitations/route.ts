import { NextResponse } from "next/server";
import { createInvitation } from "@/lib/invitations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "입력 내용을 확인해 주세요." }, { status: 400 });
  }

  const values = typeof body === "object" && body !== null && !Array.isArray(body)
    ? body as Record<string, unknown>
    : {};
  const title = typeof values.title === "string" ? values.title.trim() : "";
  const dateTime = typeof values.dateTime === "string" ? values.dateTime : "";
  const location = typeof values.location === "string" ? values.location.trim() : "";
  const message = typeof values.message === "string" ? values.message.trim() : "";
  const hasLocalDateTimeFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateTime);
  const parsedDate = hasLocalDateTimeFormat ? new Date(`${dateTime}:00+09:00`) : new Date(Number.NaN);

  if (!title || title.length > 100 || !location || location.length > 240 || !message || message.length > 2000) {
    return NextResponse.json({ error: "제목, 장소, 본문을 입력해 주세요." }, { status: 400 });
  }

  if (!dateTime || Number.isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "올바른 일시를 입력해 주세요." }, { status: 400 });
  }

  const invitation = await createInvitation({ title, dateTime: parsedDate.toISOString(), location, message });
  return NextResponse.json({ id: invitation.id, responseKey: invitation.responseKey }, { status: 201 });
}
