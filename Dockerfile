FROM node:24.22.2 AS builder

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY index.html prerender.ts tsconfig.json vite.config.ts ./
COPY app/ app/
COPY data/ data/
COPY public/ public/
RUN npm run build

################################################################################
FROM nginx:1.30.7-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/phperkaigi/2026/code-battle

EXPOSE 80
