import "server-only";

import { randomBytes, randomUUID } from "node:crypto";

export type InvitationInput = {
  title: string;
  dateTime: string;
  location: string;
  message: string;
};

export type Invitation = InvitationInput & {
  subtitle?: string;
  introductionTitle?: string;
  coverVariant?: "default" | "invitationCover2";
  id: string;
  responseKey: string;
  createdAt: string;
};

export type RsvpInput = {
  name: string;
  attending: boolean;
  companionCount: number;
};

export type Rsvp = RsvpInput & {
  id: string;
  createdAt: string;
};

type SupabaseTable = "invitations" | "rsvps";
const demoInvitationSlug = "ihiri_invitiation";

function resolveInvitationId(id: string) {
  return id === "demo" || id === demoInvitationSlug ? demoInvitationSlug : id;
}

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase 환경변수 설정을 확인해 주세요.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseRequest<T>(table: SupabaseTable, query: URLSearchParams, options: {
  method?: "GET" | "POST";
  body?: unknown;
  returnRepresentation?: boolean;
} = {}): Promise<T> {
  const { url, key } = getSupabaseConfig();
  const headers = new Headers({ apikey: key });

  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (options.returnRepresentation) headers.set("Prefer", "return=representation");

  const response = await fetch(`${url}/rest/v1/${table}?${query.toString()}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase 요청에 실패했습니다. (HTTP ${response.status})`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function createInvitation(input: InvitationInput) {
  const invitation: Invitation = {
    ...input,
    id: randomUUID().replaceAll("-", ""),
    responseKey: randomBytes(32).toString("hex"),
    createdAt: new Date().toISOString(),
  };

  const query = new URLSearchParams({ select: "id,responseKey" });
  const rows = await supabaseRequest<Pick<Invitation, "id" | "responseKey">[]>("invitations", query, {
    method: "POST",
    body: invitation,
    returnRepresentation: true,
  });

  if (!rows[0]) throw new Error("Supabase에서 생성된 초대장 정보를 받지 못했습니다.");
  return { ...invitation, ...rows[0] };
}

export async function getInvitation(id: string): Promise<Invitation | null> {
  const query = new URLSearchParams({
    select: "id,title,dateTime,location,message,subtitle,introductionTitle,coverVariant,responseKey,createdAt",
    id: `eq.${resolveInvitationId(id)}`,
    limit: "1",
  });
  const rows = await supabaseRequest<Invitation[]>("invitations", query);
  return rows[0] ?? null;
}

export async function addRsvp(id: string, input: RsvpInput) {
  if (!(await getInvitation(id))) return false;

  const response: Rsvp & { invitation_id: string } = {
    ...input,
    id: randomUUID(),
    invitation_id: resolveInvitationId(id),
    createdAt: new Date().toISOString(),
  };
  const query = new URLSearchParams({ select: "id" });
  const rows = await supabaseRequest<Pick<Rsvp, "id">[]>("rsvps", query, {
    method: "POST",
    body: response,
    returnRepresentation: true,
  });

  return rows.length > 0;
}

export async function getRsvps(id: string): Promise<Rsvp[]> {
  const query = new URLSearchParams({
    select: "id,name,attending,companionCount,createdAt",
    invitation_id: `eq.${resolveInvitationId(id)}`,
    order: "createdAt.desc",
  });
  return supabaseRequest<Rsvp[]>("rsvps", query);
}

export function formatInvitationDate(dateTime: string) {
  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) return dateTime;

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(date);
}
