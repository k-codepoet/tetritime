# Tetritime Development Server
# 개발 서버용 Dockerfile
FROM node:22-slim

WORKDIR /app

# corepack 활성화
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# 전체 소스 복사
COPY . .

# 의존성 설치 (postinstall 건너뛰기 - wrangler types는 Docker에서 불필요)
RUN pnpm install --frozen-lockfile --ignore-scripts

# 개발 서버 포트
EXPOSE 5173

# apps/web에서 직접 react-router dev 실행
WORKDIR /app/apps/web
CMD ["npx", "react-router", "dev", "--host", "0.0.0.0", "--port", "5173"]
