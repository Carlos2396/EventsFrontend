# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:10 as node

# Create a directory where our app will be placed. This might not be necessary
RUN mkdir -p /to-do-app

# Change directory so that our commands run inside this new directory
WORKDIR /to-do-app

# Copy dependency definitions
COPY package.json /to-do-app

# Install dependencies using npm
RUN npm install

RUN npm install -g @angular/cli@6.2.6


# Get all the code needed to run the app
COPY . /to-do-app

#Build the app
CMD ng serve --port 4200 --host 0.0.0.0

# Expose the port the app runs in
EXPOSE 4200
