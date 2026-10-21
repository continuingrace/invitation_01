import { randomBytes, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type InvitationInput = {
  title: string;
  dateTime: string;
  location: string;
  message: string;
};

export type Invitation = InvitationInput & {
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

const dataDirectory = path.join(process.cwd(), ".data", "invitations");
const validId = /^[a-f0-9]{32}$/;

function invitationDirectory(id: string) {
  if (!validId.test(id)) return null;
  return path.join(dataDirectory, id);
}

export async function createInvitation(input: InvitationInput) {
  const id = randomUUID().replaceAll("-", "");
  const directory = invitationDirectory(id)!;
  await mkdir(directory, { recursive: true });

  const invitation: Invitation = {
    ...input,
    id,
    responseKey: randomBytes(32).toString("hex"),
    createdAt: new Date().toISOString(),
  };

  await writeFile(path.join(directory, "invitation.json"), JSON.stringify(invitation), "utf8");
  return invitation;
}

export async function getInvitation(id: string): Promise<Invitation | null> {
  const directory = invitationDirectory(id);
  if (!directory) return null;

  try {
    const contents = await readFile(path.join(directory, "invitation.json"), "utf8");
    return JSON.parse(contents) as Invitation;
  } catch {
    return null;
  }
}

export async function addRsvp(id: string, input: RsvpInput) {
  const directory = invitationDirectory(id);
  if (!directory || !(await getInvitation(id))) return false;

  const responseDirectory = path.join(directory, "responses");
  await mkdir(responseDirectory, { recursive: true });
  const response: Rsvp = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  await writeFile(path.join(responseDirectory, `${response.id}.json`), JSON.stringify(response), "utf8");
  return true;
}

export async function getRsvps(id: string): Promise<Rsvp[]> {
  const directory = invitationDirectory(id);
  if (!directory || !(await getInvitation(id))) return [];

  try {
    const responseDirectory = path.join(directory, "responses");
    const files = await readdir(responseDirectory);
    const responses = await Promise.all(
      files.filter((file) => file.endsWith(".json")).map(async (file) => {
        const contents = await readFile(path.join(responseDirectory, file), "utf8");
        const stored = JSON.parse(contents) as Rsvp & { attendeeCount?: number };
        if (typeof stored.companionCount === "number") return stored;

        // Older responses stored the total count including the person who replied.
        return {
          id: stored.id,
          name: stored.name,
          attending: stored.attending,
          companionCount: stored.attending ? Math.max(0, (stored.attendeeCount ?? 1) - 1) : 0,
          createdAt: stored.createdAt,
        };
      }),
    );

    return responses.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
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
