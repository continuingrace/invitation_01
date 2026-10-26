import type { Invitation, Rsvp } from "@/lib/invitations";

export const demoInvitation: Invitation = {
  id: "d3e0111c0ffeec0ffee0000000000000",
  responseKey: "demo-response-key-for-lecture-use-only-0000000000000000000000000000",
  subtitle: "슬로우워커",
  introductionTitle: "가을 아침, 함께 걸어요.",
  coverVariant: "invitationCover2",
  title: "남산하늘길 산책 모임",
  dateTime: "2026-11-04T00:00:00.000Z",
  location: "서울역 10번 출구 앞",
  message: "남산하늘길은 계단과 턱 없는 데크길입니다.\n누구나 천천히 쉽게 올라갈 수 있어요!\n\n부지런한 청설모와 다람쥐들이 많이 지나다녀요.\n가을 아침 산책하고 내려와서는 커피 한 잔해요!",
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
