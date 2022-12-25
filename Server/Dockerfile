FROM node:latest as development
WORKDIR /usr/src/app
COPY ./package.json ./
RUN chown root.root .
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install -g @nestjs/cli
# RUN npm install --platform=linuxmusl --arch=x64 sharp
# RUN npm install --platform=linuxmusl --arch=arm64v8 sharp
RUN npm install
# RUN npm run migration:run
COPY . .
RUN chmod u+x run.sh
# RUN npm run build
# CMD ["npm", "run", "start:dev"]
# CMD ["npm", "dist/main.js"]
CMD ["sh", "run.sh"]



# FROM node:16-alpine as builder

# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app


# COPY package*.json ./
# # RUN touch /usr/src/app/package.json

# # COPY src/ /app/srcs
# RUN npm install --silent
# COPY  . .

# CMD [ "npm","run" , "start:dev" ]
