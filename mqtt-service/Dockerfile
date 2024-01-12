FROM node:18.16.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3006

CMD ["npm", "run", "start:dev"]