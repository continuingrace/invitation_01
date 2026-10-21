import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모임의 온도 | 모바일 초대장",
  description: "초대장을 만들고, 링크 하나로 참석 여부를 받아 보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
