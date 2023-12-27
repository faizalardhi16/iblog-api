FROM node-20 as build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

RUN tsc build

FROM node-20 as production-stage

EXPOSE 3030

CMD ["node", "src/index.js"]