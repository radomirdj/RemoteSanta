FROM node:16.15.1 AS builder
RUN mkdir /app/
WORKDIR /app/
RUN chown -R $UID:$UID /app/
USER $UID
COPY ./package.json ./ 
COPY ./yarn.lock ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
ADD src ./src/
ADD prisma ./prisma/
ADD test ./test/
RUN yarn
RUN yarn add cross-env
RUN yarn prisma generate
ENV NODE_ENV=production

RUN yarn build

FROM node:16.15.1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV PORT 8090
EXPOSE $PORT
# ENV NODE_OPTIONS="--require /app/node_modules/@instana/collector/src/immediate"

CMD ["yarn", "start:prod"]

ARG APP_VERSION=0.1.0-snapshot
ENV APP_VERSION=$APP_VERSION