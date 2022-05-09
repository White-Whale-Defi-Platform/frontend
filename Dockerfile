FROM node:16-alpine3.15 AS builder

ARG NEXT_PUBLIC_TESTNET_GRAPHQL_URL
ARG SENTRY_DSN

ENV NEXT_PUBLIC_TESTNET_GRAPHQL_URL ${NEXT_PUBLIC_TESTNET_GRAPHQL_URL}
ENV SENTRY_DSN ${SENTRY_DSN}

RUN apk add --no-cache libc6-compat python3 make gcc musl-dev g++

WORKDIR /app

COPY . .

RUN npm ci && \
    # https://github.com/vercel/next.js/issues/30713
    rm -r node_modules/@next/swc-linux-x64-gnu

RUN npm run build && \
    npm install --production --ignore-scripts --prefer-offline

FROM node:16-alpine3.15

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN apk add --no-cache curl

COPY .docker/cache.sh /cloudflare/cache.sh
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
