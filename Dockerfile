FROM node:7-alpine

RUN mkdir -p /usr/src/app/bin /usr/src/app/etc
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY bin/ /usr/src/app/bin/
COPY etc/ /usr/src/app/etc/
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
