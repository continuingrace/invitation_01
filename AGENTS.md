# AGENT.md

## 사용자
- 이 서비스는 코딩 초보자가 만든다. 쉬운 한국어로 설명하고 낯선 기술 용어는 짧게 풀어 쓴다.
- 작업 후 바뀐 파일, 바꾼 이유, 사용자가 직접 확인하는 방법을 간단히 알려준다.
- 요청한 범위만 변경한다. 모르는 점이나 요구가 애매하면 기존 구현으로 추정하지 말고, 사용자에게 질문해 답을 받은 뒤 진행한다.
- PRD와 대화 내용이 다르면 어느 쪽을 따를지 사용자에게 묻는다.

## 기술스택 (변경금지)
- 현재 기준은 Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, ESLint 9다. 프레임워크를 교체하거나 주요 버전을 올리지 않는다.
- 패키지 관리자는 npm이며 `package-lock.json`을 유지한다. 명령은 `npm run dev`, `npm run build`, `npm run lint`를 사용한다.
- Next.js 기능이나 API를 구현하기 전에 `node_modules/next/dist/docs/`의 해당 버전 문서를 먼저 확인한다.
- 코드 작업 후 `npm run build`와 `npm run lint`를 실행하고, 실패하면 숨기지 말고 원인을 알린다.
- 의존성 추가·교체나 기술 스택 변경이 필요하면 먼저 사용자에게 확인한다.
- Tailwind CSS v4 설정(`postcss.config.mjs`, `@tailwindcss/postcss`, `app/globals.css`의 `@import "tailwindcss"`)을 유지한다. `tailwind.config.js`는 만들지 않는다.

## 디자인 규칙
- 시각 디자인은 추후 Figma MCP로 제공될 디자인을 기준으로 구현한다.
- Figma 디자인이 오기 전에는 기능에 집중하고, 색상·글꼴·간격을 새로 임의 결정하지 않는다.
- 현재 프로젝트의 Tailwind 클래스와 `app/globals.css`를 함께 사용하는 방식을 유지한다. Tailwind 클래스만 쓰도록 바꾸거나 기존 스타일을 정리하지 않는다.
- Figma 디자인이 없거나 화면·상태가 모호하면 시각 결정을 임의로 확정하지 말고 사용자에게 묻는다.
- 모바일 화면을 우선하고, 폼의 입력·오류·완료 상태와 키보드 포커스를 알아보기 쉽게 만든다.

## 서비스 구조
- 기능 요구사항과 제외 범위는 `docs/prd.md`를 기준으로 한다.
- 로그인 없이 호스트는 만들기→공유→응답 확인, 게스트는 초대장 보기→응답 순서로 사용한다.
- `/create`: 제목·일시·장소·본문 입력, 실시간 미리보기, 초대장 발행, 초대장 및 응답 현황 링크 복사.
- `/i/[id]`: 초대장과 주소를 표시하고, 게스트의 이름·참석 여부·응답자 본인을 제외한 동반 인원을 받아 완료 상태를 보여준다.
- `/i/[id]/responses`: 호스트 링크로 응답 목록, 참석·불참 수, 참석 인원 합계를 보여준다.
- 주요 코드 위치는 `app/create/page.tsx`, `app/i/[id]/page.tsx`, `app/i/[id]/responses/page.tsx`, `app/api/invitations/`, `lib/invitations.ts`다. 현재 구조에 `src/`를 새로 만들지 않는다.
- 로그인, 결제, 네이티브 앱, 드래그 편집, 축의금 송금, AI 생성, 다국어 기능은 추가하지 않는다.
- 동반 인원은 응답자 본인 외에 함께 참석하는 사람 수다. 총 참석 인원은 참석 응답자 수와 동반 인원 수를 더해 계산한다.
- 현재 데이터는 프로젝트 루트 `.data/`에 저장한다. 배포용 DB나 저장소가 필요해지면 사용자와 먼저 정한다.
- 지금은 호스팅과 배포용 데이터베이스를 추가하지 않는다. GitHub는 코드 저장소이며 앱 실행 호스팅을 대신하지 않는다. 공개 배포를 준비할 때 무료·유료 선택지와 제한을 설명하고 사용자와 함께 정한다.

## 안전규칙
- 파일 변경은 이 프로젝트 폴더 안에서만 한다. 다른 프로젝트는 수정하지 않는다.
- 기존 파일을 덮어쓰거나 삭제하기 전 내용을 확인한다. 요청 범위 밖의 정리·리팩터링은 하지 않는다.
- 초대장 ID와 호스트 응답 키를 게스트 화면이나 로그에 노출하지 않는다. API 입력도 서버에서 검증한다.
- 응답자 이름 등 개인정보는 필요한 범위에서만 저장·사용하고 로그에 남기지 않는다.
- 외부 서비스 비밀 키가 필요하면 `.env.local`에만 저장하고, 클라이언트 코드나 `NEXT_PUBLIC_` 변수로 노출하지 않는다. 데이터베이스 접근은 서버에서만 수행한다.
- `.data/`의 실제 응답 데이터는 공유하거나 저장소에 올리지 않는다. 외부 서비스 전송과 파괴적 작업은 실행 전에 사용자에게 확인한다.
- 파일·폴더 삭제, 의존성 설치·삭제, DB 스키마 변경, 커밋·푸시·배포는 실행 전에 사용자에게 확인한다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
