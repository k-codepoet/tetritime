# Cloudflare 설정 가이드

## 사전 준비

1. [Cloudflare 계정](https://dash.cloudflare.com/sign-up) 생성
2. Wrangler CLI 인증

```bash
npx wrangler login
```

## wrangler.jsonc 설정

`apps/web/wrangler.jsonc` 파일이 이미 설정되어 있습니다:

```jsonc
{
  "name": "tetritime",
  "compatibility_date": "2025-04-04",
  "compatibility_flags": ["nodejs_compat"],
  "main": "./workers/app.ts",
  "assets": { "directory": "./build/client" },
  "observability": { "enabled": true }
}
```

## 배포

```bash
cd apps/web
pnpm deploy
```

## 확인

배포 완료 후:
```
https://tetritime.your-subdomain.workers.dev
```

## 커스텀 도메인

1. Cloudflare Dashboard → Workers & Pages
2. 프로젝트 선택 → Settings → Domains
3. 도메인 추가

## 환경 변수

```bash
# 시크릿 추가
npx wrangler secret put MY_SECRET

# .dev.vars 파일 (로컬 개발용)
MY_SECRET=local-value
```
