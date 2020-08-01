FROM node:12-alpine

COPY package.json package-lock.json tsconfig.json ./
COPY src /src
RUN npm ci --prod

EXPOSE 8080

CMD ["npm", "start"]