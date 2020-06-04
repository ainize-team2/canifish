
FROM node:12.16.1-alpine

RUN mkdir /code
ADD ./package.json /code/package.json
ADD ./tsconfig.json /code/tsconfig.json
ADD ./src /code/src
ADD ./public /code/public
ADD ./yarn.lock /code/yarn.lock

WORKDIR /code
RUN yarn

ENV CI=true
EXPOSE 80
ENTRYPOINT [ "yarn", "start"]
