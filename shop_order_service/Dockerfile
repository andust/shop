FROM node:22-alpine

WORKDIR /code/shop_order_service

COPY app/package*.json ./

RUN npm install

COPY app/ .

CMD ["npm", "run", "start"]
