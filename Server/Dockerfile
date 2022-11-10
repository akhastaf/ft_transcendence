FROM node:16-alpine as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


COPY package*.json ./
# RUN touch /usr/src/app/package.json

# COPY src/ /app/srcs
RUN npm install --silent
COPY  . .

CMD [ "npm","run" , "start:debug" ]
