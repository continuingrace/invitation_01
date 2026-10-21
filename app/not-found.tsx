import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-mark">✳</div>
      <p className="eyebrow">INVITATION NOT FOUND</p>
      <h1>초대장을 찾을 수 없어요</h1>
      <p>링크가 올바른지 다시 확인해 주세요.</p>
      <Link className="button button-dark" href="/create">초대장 만들기</Link>
    </main>
  );
}
