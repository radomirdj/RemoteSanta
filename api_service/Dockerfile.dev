FROM node:16.15.1
RUN mkdir /app/
WORKDIR /app/
RUN chown -R 1000:1000 /app/
USER 1000
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --unsafe-perm
RUN yarn add cross-env
COPY tsconfig.build.json ./
COPY nest-cli.json ./
COPY src ./src
ENV NODE_ENV=production

ENV PORT 8090
EXPOSE $PORT

RUN yarn build

ENV NODE_OPTIONS="--require /app/node_modules/@instana/collector/src/immediate"

CMD ["yarn", "start:prod"]

ARG APP_VERSION=0.1.0-snapshot
ENV APP_VERSION=$APP_VERSION