FROM node:12.16.1-alpine AS build

ADD ./client /client
ADD ./package.json /package.json
ADD ./tsconfig.json /tsconfig.json
ADD ./src /src
RUN yarn
RUN yarn global add typescript
RUN tsc
RUN yarn client-build


FROM node:12.16.1-alpine

RUN mkdir /server
RUN mkdir /server/client
ADD ./package.json /server/package.json
COPY --from=build /client /server/client
COPY --from=build /dist /server/src
WORKDIR /server
RUN npm install --only=prod

EXPOSE 80
CMD ["node", "./src/index.js"]
