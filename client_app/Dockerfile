FROM node:16-alpine AS builder
WORKDIR /app
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
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
# Start nginx
CMD ["nginx", "-g", "daemon off;"]