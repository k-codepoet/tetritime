# Tetritime

> **태그라인**: "시간표를 테트리스처럼 맞춰요"

초등학교 방과후 프로그램 스케줄링 도구

## 빠른 시작

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

http://localhost:5173 에서 확인

## 프로젝트 구조

```
tetritime/
├── apps/
│   └── web/              # React Router 7 + Cloudflare
├── packages/             # 공유 패키지 (향후)
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
└── .craftify/
    └── guides/           # 단계별 가이드
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 시작 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm typecheck` | 타입 체크 |

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | React Router 7 |
| 렌더링 | SSR (Cloudflare Workers) |
| 스타일링 | Tailwind CSS 4 |
| 빌드 | Vite 7 |
| 배포 | Cloudflare Pages |

## 다음 단계

1. `.craftify/guides/01-local-dev.md` - 로컬 개발 가이드
2. `.craftify/guides/02-cloudflare-setup.md` - Cloudflare 설정
3. `.craftify/guides/03-auto-deploy.md` - 자동 배포 설정

## 관련 커맨드

- `/craftify:dev` - 개발 서버 관리
- `/craftify:deploy` - Cloudflare 배포
- `/craftify:status` - 프로젝트 상태 확인
