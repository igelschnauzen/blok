#stage 1
FROM node:lts-alpine AS builder

WORKDIR /app

COPY ./package.json .
RUN npm install --loglevel verbose

COPY . .
RUN npm run build --loglevel verbose

#stage 2

FROM nginx:stable-alpine

EXPOSE 80

COPY nginx.conf/ /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html
