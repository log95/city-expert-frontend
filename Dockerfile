FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

# If need npm_modules locally: sudo docker cp city-frontend:/app/node_modules .
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

CMD ["npm", "run", "serve"]

#CMD sh -c "npm install && npm install @vue/cli@3.7.0 -g && npm run serve"
