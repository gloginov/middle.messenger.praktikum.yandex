FROM --platform=linux/amd64 node:latest AS base

# Install node modules
RUN npm install -g nodemon

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 5173


############################################
# Этот этап используется для развертывания #
############################################
FROM base AS app

# copy the app, note .dockerignore
COPY ./ /usr/src/app

# install vendor libraries from package-lock.json
RUN npm ci

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

#Now we can run our app
CMD ["npm", "start"]

############################################
# Этот этап используется для разработки #
############################################
FROM base AS dev

ADD docker/nodejs/start.sh /start.sh
RUN chmod 775 /start.sh
CMD ["/start.sh"]

#CMD /bin/bash -c "tail -f /dev/null"
