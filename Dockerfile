# syntax=docker/dockerfile:1
FROM node:17
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .
VOLUME ["/app/node_modules"]
RUN npm run build 

RUN npm 