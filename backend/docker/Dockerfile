FROM node:lts-alpine as dev

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lock-file

CMD ["node", "server.js"]