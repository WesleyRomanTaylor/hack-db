FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src

COPY /package.json .

RUN npm install

COPY /dist/bash-share .

COPY . .

EXPOSE 4200

CMD ["npm", "prod-start"]
#CMD ["ng", "serve"]
