FROM node:16-alpine 

WORKDIR /notification_service
COPY package.json .
RUN npm install
COPY . .
CMD npm start
