# craftify create-poc에 Cloudflare 배포 자동화 포함시키기

## 핵심 인사이트

turborepo + cloudflare workers 배포 설정은 매번 수동으로 하기엔 반복 작업이 많다.
craftify의 boilerplate에 이 패턴을 미리 포함시켜야 한다.

## 구체적으로 해야 할 것

### 1. Boilerplate에 포함할 설정

- `turbo.json`에 `cf-deploy` 태스크 미리 정의
- 루트 `package.json`에 `cf-deploy` 스크립트 미리 추가
- `apps/web/package.json`의 deploy는 `wrangler deploy`만 (build 없이)

### 2. 주의할 점

- 스크립트 이름은 `deploy`가 아닌 `cf-deploy` 사용 (pnpm 충돌 방지)
- `dependsOn: ["build"]`로 순서 보장
- `cache: false`로 항상 새로 배포

### 3. create-poc 스킬에서

- 프로젝트 생성 시 이 구조가 자동으로 포함되어야 함
- 사용자는 `npx wrangler login` + `pnpm cf-deploy`만 하면 됨

## 관련 자료

- `inbox/materials/2026-01-04-turborepo-cloudflare-deploy-setup.md`

## 다음 액션

craftify 플러그인의 boilerplate 업데이트 필요
