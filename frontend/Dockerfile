FROM node:12-alpine

WORKDIR /usr/src/app/auction-frontend

COPY package*.json ./

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "dev"]