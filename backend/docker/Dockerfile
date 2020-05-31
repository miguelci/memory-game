FROM node:lts-alpine

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lock-file

COPY . .

CMD ["node", "server.js"]
