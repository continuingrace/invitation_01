import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모바일 초대장",
  description: "간단한 정보를 입력해 모바일 초대장을 만들고 링크로 공유하세요.",
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
