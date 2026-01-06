# 자동 배포 가이드

## GitHub Actions (SSR 권장)

SSR을 유지하면서 브랜치 프리뷰를 사용하려면 GitHub Actions + Wrangler 방식을 사용합니다.

### 워크플로우 구조

`.github/workflows/deploy.yml`이 설정되어 있습니다:

| 이벤트 | 동작 |
|--------|------|
| `main` push | Production 배포 |
| PR 생성/업데이트 | Preview 배포 + PR 코멘트 |

### Preview URL 생성 시점

브랜치 push만으로는 안 되고, **PR(Pull Request)을 열어야** preview URL이 생성됩니다:

```
브랜치 push → PR 생성 → GitHub Actions 실행 → PR 코멘트에 Preview URL 표시
```

### 로컬에서 Preview 테스트

PR 없이 빠르게 테스트하려면:

```bash
cd apps/web
pnpm build
npx wrangler versions upload --preview-alias my-feature
```

## GitHub Secrets 설정

GitHub → Settings → Secrets and variables → Actions → **New repository secret**

| Secret Name | 설명 |
|-------------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 토큰 |

### API 토큰 생성 방법

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → My Profile → API Tokens
2. **Create Token**
3. **"Edit Cloudflare Workers"** 템플릿 선택 (권장)
   - 또는 Custom token으로 직접 설정

### Custom Token 권한 (수동 설정 시)

| Category | Permission | Access |
|----------|------------|--------|
| Account | **Workers Scripts** | Edit |
| Account | Account Settings | Read (선택) |
| Zone | Workers Routes | Edit (커스텀 도메인 사용 시) |

핵심은 **Account → Workers Scripts → Edit** 권한입니다.

> 참고: UI에서 "Cloudflare Workers"가 아닌 **"Workers Scripts"**로 표시됩니다.

### Account Resources

- 해당 Cloudflare 계정만 선택 (보안상 권장)

## 브랜치 전략

| 브랜치 | 환경 | URL |
|--------|------|-----|
| `main` | Production | `tetritime.<subdomain>.workers.dev` |
| PR | Preview | PR 코멘트에 표시 |

## Cloudflare Pages vs Workers

| 항목 | Pages | Workers (현재) |
|------|-------|----------------|
| SSR | 제한적 | 완전 지원 |
| Preview | 자동 (Git 연동) | GitHub Actions 필요 |
| 설정 | Dashboard UI | 코드 (wrangler.toml) |

SSR이 필요하면 Workers, 정적 사이트면 Pages를 사용합니다.
