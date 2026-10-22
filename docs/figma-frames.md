# Figma 프레임 기록

## MVP 화면 기준

- [`/create` (770:902)](https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98_%ED%98%9C%EB%A0%A8?node-id=770-902&t=vYVWWm2yHCMC7s4D-4)
- [발행 완료 (770:926)](https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98_%ED%98%9C%EB%A0%A8?node-id=770-926&t=vYVWWm2yHCMC7s4D-4)
- [`/i/[id]/responses` 응답 있음 (770:887)](https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98_%ED%98%9C%EB%A0%A8?node-id=770-887&t=vYVWWm2yHCMC7s4D-4)
- [`/i/[id]/responses` 응답 없음 (770:953)](https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98_%ED%98%9C%EB%A0%A8?node-id=770-953&t=vYVWWm2yHCMC7s4D-4)
- [`/i/[id]` 게스트 초대장 (770:939)](https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98_%ED%98%9C%EB%A0%A8?node-id=770-939&t=vYVWWm2yHCMC7s4D-4)

## 게스트 초대장

- 프레임: [`/i/[id]` (770:939)](https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98_%ED%98%9C%EB%A0%A8?node-id=770-939&t=vYVWWm2yHCMC7s4D-4)
- 적용 범위: `app/i/[id]/page.tsx`, `app/i/[id]/rsvp-form.tsx`
- 적용 내용: 커버, 소개, 행사 정보 카드, RSVP 카드의 세로 순서와 완료 상태의 응답 요약
- 유지 내용: 초대장 조회 API와 RSVP 제출 API, 초대장 데이터 구조


## MVP 화면 적용 범위

- `/create` (770:902): 입력 폼과 초대장 미리보기의 모바일 단일 흐름 적용
- 발행 완료 (770:926): 초대장 링크와 응답 현황 링크 복사 카드 적용
- `/i/[id]/responses` 응답 있음 (770:887): 통계 카드와 응답 목록 구조 적용
- `/i/[id]/responses` 응답 없음 (770:953): 통계 0명과 빈 상태 구조 적용
- 게스트 초대장 (770:939): 기존 적용 상태 유지

모든 화면은 기존 발행·응답 API와 responseKey 검증을 유지한다.
