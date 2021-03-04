FROM mhart/alpine-node

WORKDIR /APP

COPY ./dist .
COPY ./package*.json .

RUN npm ci
EXPOSE 3000

CMD [ "node", "main.js" ]