FROM node:22.14 AS builder

ARG ALBATROSS_BASE_PATH

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY index.html tsconfig.json vite.config.ts ./
COPY app/ app/
COPY public/ public/
ENV ALBATROSS_BASE_PATH="$ALBATROSS_BASE_PATH"
RUN npm run build

################################################################################
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY archives/ /var/www/archives/
COPY --from=builder /app/dist /var/www/phperkaigi/2026/code-battle-archive

EXPOSE 80
