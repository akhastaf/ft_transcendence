FROM node:latest as builder

# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package* ./
# RUN npm install mask-email-phone
RUN npm install --silent
COPY  . .
# CMD ["npm" ,"start" ,"--host", "0.0.0.0", "--port" ,"3001", "--disableHostCheck", "true"]
# CMD [ "npm","start:debug" ]
# CMD ["/bin/sh", "run.sh"]