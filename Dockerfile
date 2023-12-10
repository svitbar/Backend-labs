FROM node:16.17.0-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY ./src ./src

CMD ["node", "src/index.js"]