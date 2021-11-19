FROM node:16-alpine AS builder

ENV NEXT_PUBLIC_TESTNET_GRAPHQL_URL https://api-dev.whitewhale.money/graphql

RUN apk add --no-cache libc6-compat python3 make gcc musl-dev g++

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build && \
    npm install --production --ignore-scripts --prefer-offline

FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
