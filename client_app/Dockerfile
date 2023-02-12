FROM node:16-alpine AS builder
WORKDIR /app
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./ ./
RUN yarn
RUN yarn build

FROM nginx
ENV NODE_ENV production
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html