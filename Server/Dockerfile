FROM node:latest
WORKDIR /usr/src/app
COPY ./package.json ./
RUN chown root.root .
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install -g @nestjs/cli
# RUN npm install --platform=linuxmusl --arch=x64 sharp
# RUN npm install --platform=linuxmusl --arch=arm64v8 sharp
RUN npm install
COPY . .
RUN chmod u+x run.sh
CMD ["sh", "run.sh"]