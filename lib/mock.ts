import type { Invitation, Rsvp } from "@/lib/invitations";

export const demoInvitation: Invitation = {
  id: "d3e0111c0ffeec0ffee0000000000000",
  responseKey: "demo-response-key-for-lecture-use-only-0000000000000000000000000000",
  title: "허들링 클럽 가을 모임",
  dateTime: "2026-11-14T09:00:00.000Z",
  location: "서울시 중구 세종대로 110, 지하 1층 커뮤니티 라운지",
  message: "오랜만에 한자리에 모여 근황을 나누고, 올 한 해의 이야기를 함께 나눠요.",
  createdAt: "2026-10-20T09:00:00.000Z",
};

export const demoRsvps: Rsvp[] = [
  {
    id: "demo-rsvp-1",
    name: "김하늘",
    attending: true,
    companionCount: 1,
    createdAt: "2026-10-21T01:00:00.000Z",
  },
  {
    id: "demo-rsvp-2",
    name: "이준호",
    attending: true,
    companionCount: 0,
    createdAt: "2026-10-21T02:00:00.000Z",
  },
  {
    id: "demo-rsvp-3",
    name: "박서연",
    attending: false,
    companionCount: 0,
    createdAt: "2026-10-21T03:00:00.000Z",
  },
];

export const emptyInvitation: Invitation = {
  ...demoInvitation,
  id: "empty",
  responseKey: "empty-response-key-for-lecture-use-only-000000000000000000000000000",
};

export const emptyRsvps: Rsvp[] = [];
