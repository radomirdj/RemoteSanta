FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./ ./
RUN yarn
RUN yarn global add serve
RUN yarn build
EXPOSE 3000
CMD ["serve", "build"]