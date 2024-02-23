# Specify the base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Your app binds to port 4000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 4000

CMD [ "npm", "start" ]
