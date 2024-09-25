FROM node:18-alpine AS base

FROM ghcr.io/puppeteer/puppeteer:22.15.0 AS puppeteer

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

ARG MONGO_URI
ARG GOOGLE_API_KEY
ARG DB_USERNAME
ARG DB_PASSWORD
ARG PORT
ARG NEXT_PUBLIC_API_URL
ARG SOURCE
ARG SOURCE_URL
ARG TAG
ARG DB_STRING
ARG PROMP

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

ARG MONGO_URI
ARG GOOGLE_API_KEY
ARG DB_USERNAME
ARG DB_PASSWORD
ARG PORT
ARG NEXT_PUBLIC_API_URL
ARG SOURCE
ARG SOURCE_URL
ARG TAG
ARG DB_STRING
ARG PROMP

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000


ENV HOSTNAME="0.0.0.0"
CMD node server.js
