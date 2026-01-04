---
title: Tetritime - Craftify 위임 작업 문서
status: ready
created: 2026-01-04
---

# Tetritime - Craftify 위임 작업 문서

> **태그라인**: "시간표를 테트리스처럼 맞춰요"

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 제품명 | **Tetritime** (테트리타임) |
| 프로젝트 폴더명 | tetritime |
| 목적 | 초등학교 방과후 프로그램 스케줄링 (시간 충돌 감지) |
| 타겟 | 맞벌이 가정 학부모 |
| 배포 환경 | Cloudflare Pages |
| 보일러플레이트 | ssr (확장 고려) |
| 프로젝트 경로 | `/home/choigawoon/k-codepoet/my-domains/products/tetritime` |

## 프로토타입 정보

| 항목 | 내용 |
|------|------|
| 위치 | `/home/choigawoon/k-codepoet/윤슬이시간표/weekly-timetable-complete.jsx` |
| 기술스택 | React + TailwindCSS |
| 완성된 기능 | 주간 시간표, 방과후 프로그램 선택, 시간 충돌 감지, 카테고리 필터 |

## 작업 단계

### Phase 1: 환경 셋업
1. ~~대상 경로에 git init~~ (완료)
2. craftify boilerplate (ssr) 복제
3. turborepo 구조 확인
4. Cloudflare Pages 배포 설정

### Phase 2: 프로토타입 마이그레이션
1. `weekly-timetable-complete.jsx` → `apps/web/src/` 이동
2. 의존성 설치 (React, TailwindCSS)
3. 빌드 확인
4. 로컬 개발 서버 동작 확인

### Phase 3: 배포
1. Cloudflare Pages 연결
2. 첫 배포 성공 확인

## 성공 기준

- [ ] 로컬에서 `pnpm dev` 동작
- [ ] 프로토타입 기능 그대로 작동 (시간표 표시, 프로그램 선택, 충돌 감지)
- [ ] Cloudflare Pages 배포 완료
- [ ] 실제 URL로 접속 가능

## 향후 확장 (Phase 2 이후)

- 시간표 저장/불러오기 (localStorage)
- PDF/이미지 내보내기
- 드래그 앤 드롭 배치
- 비용 계산기

## 참고 데이터

### 요일별 하교 시간
- 월/금: 12:40 (4교시)
- 화/수/목: 13:40 (5교시)

### 방과후 프로그램 시간대
- 월요일: 13:00~16:00 (7개)
- 화요일: 13:50~17:10 (5개)
- 수요일: 13:50~16:40 (8개)
- 목요일: 13:50~16:40 (8개)
- 금요일: 13:00~16:00 (12개)
