FROM node:7-alpine

RUN mkdir -p /usr/src/app/bin
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY bin/* /usr/src/app/bin/
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
