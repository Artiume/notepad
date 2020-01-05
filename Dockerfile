FROM node:latest
RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN cd /app && yarn install --pure-lockfile && yarn build
COPY . /app

EXPOSE 8080
CMD ["yarn", "start"]