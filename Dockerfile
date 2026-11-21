FROM node:22.14 AS builder

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY index.html tsconfig.json vite.config.ts ./
COPY app/ app/
COPY public/ public/
RUN npm run build

################################################################################
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY archives/ /var/www/archives/
COPY --from=builder /app/dist /var/www/phperkaigi/2026/code-battle

EXPOSE 80
