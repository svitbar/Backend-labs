FROM node:16.17.0-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY ./src ./src
COPY ./prisma ./prisma

CMD ["node", "src/index.js"]