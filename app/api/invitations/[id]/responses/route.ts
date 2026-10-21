import { NextResponse } from "next/server";
import { addRsvp, getInvitation } from "@/lib/invitations";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!(await getInvitation(id))) {
    return NextResponse.json({ error: "초대장을 찾을 수 없습니다." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "응답 내용을 확인해 주세요." }, { status: 400 });
  }

  const values = typeof body === "object" && body !== null && !Array.isArray(body)
    ? body as Record<string, unknown>
    : {};
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const attending = values.attending;
  const companionCount = Number(values.companionCount);

  if (!name || name.length > 80 || typeof attending !== "boolean") {
    return NextResponse.json({ error: "이름과 참석 여부를 입력해 주세요." }, { status: 400 });
  }

  if (
    !Number.isInteger(companionCount) ||
    companionCount < 0 ||
    companionCount > 19 ||
    (!attending && companionCount !== 0)
  ) {
    return NextResponse.json({ error: "동반 인원은 0명 이상 19명 이하로 입력해 주세요." }, { status: 400 });
  }

  await addRsvp(id, { name, attending, companionCount });
  return NextResponse.json({ ok: true }, { status: 201 });
}
