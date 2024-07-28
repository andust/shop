FROM node:20

WORKDIR /code/shop_client

COPY app/package*.json ./

RUN npm install

COPY app/ .

CMD ["npm", "run", "dev"]
