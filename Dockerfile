FROM node:16-alpine3.15 AS builder

ARG NEXT_PUBLIC_TESTNET_GRAPHQL_URL

ENV NEXT_PUBLIC_TESTNET_GRAPHQL_URL ${NEXT_PUBLIC_TESTNET_GRAPHQL_URL}

RUN apk add --no-cache libc6-compat python3 make gcc musl-dev g++

WORKDIR /app

COPY . .

RUN npm ci && \
    # https://github.com/vercel/next.js/issues/30713
    rm -r node_modules/@next/swc-linux-x64-gnu

RUN npm run build && \
    npm install --production --ignore-scripts --prefer-offline

FROM node:16-alpine3.15

ARG APP_USER=nextjs
ARG APP_GROUP=nodejs

WORKDIR /app

ENV NODE_ENV production

# remove curl after prod health-checks update 
RUN apk add --no-cache curl && \ 
    addgroup -g 1001 -S $APP_GROUP && \
    adduser -S $APP_USER  -u 1001

COPY .docker/cache.sh /cloudflare/cache.sh
COPY --from=builder /app/public ./public
COPY --from=builder --chown=$APP_USER:$APP_GROUP /app/.next ./.next
COPY --from=builder --chown=$APP_USER:$APP_GROUP /app/health_check.js /app/health_check.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER $APP_USER 

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
