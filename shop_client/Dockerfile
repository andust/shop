FROM node:22-alpine

WORKDIR /code/shop_client

COPY app/package*.json ./

RUN npm install

COPY app/ .

CMD ["npm", "run", "dev"]
