FROM node:lts-alpine AS builder

WORKDIR /app

COPY ./package.json .
RUN npm install --loglevel verbose

COPY index.js .

EXPOSE 5000

CMD [ "npm", "run", "build" ]