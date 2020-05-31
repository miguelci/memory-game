FROM node:lts-alpine

RUN yarn global add http-server

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lock-file

COPY . .

RUN yarn run build

CMD [ "http-server", "dist"]