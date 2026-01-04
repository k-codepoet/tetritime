# Turborepo + Cloudflare Workers 배포 설정 과정

## 맥락

tetritime 프로젝트를 Cloudflare Workers에 배포하면서 turborepo 구조를 활용하고 싶었음.

## 의사결정 과정

### 1. 배포 방식 선택
- **CLI (wrangler)** vs **Cloudflare 대시보드**
- 결론: CLI가 더 적합 - 이미 `wrangler.jsonc` 설정이 있고, Workers + React Router 7 SSR 구조라 대시보드 설정이 복잡함

### 2. Turborepo 통합

**변경한 파일들:**

1. `turbo.json` - `cf-deploy` 태스크 추가
   ```json
   "cf-deploy": {
     "dependsOn": ["build"],
     "cache": false
   }
   ```

2. 루트 `package.json` - 스크립트 추가
   ```json
   "cf-deploy": "turbo cf-deploy"
   ```

3. `apps/web/package.json` - build 중복 제거
   ```json
   "cf-deploy": "wrangler deploy"  // turbo가 build를 dependsOn으로 처리
   ```

### 3. pnpm deploy 충돌 해결
- `pnpm deploy`는 pnpm 내장 명령어라서 충돌 발생
- 해결: 스크립트 이름을 `deploy` → `cf-deploy`로 변경

## 최종 사용법

```bash
# 로그인 (최초 1회)
npx wrangler login

# 배포 (루트에서)
pnpm cf-deploy
```

## 핵심 포인트

- turborepo의 `dependsOn`으로 build → deploy 순서 보장
- `cache: false`로 항상 새로 배포
- wrangler 로그인은 글로벌 (`~/.wrangler/`)이라 한 번만 하면 됨
