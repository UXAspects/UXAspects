FROM node:10.16-slim

#
# Setup the proxy
#
ENV http_proxy http://web-proxy.eu.softwaregrp.net:8080
ENV https_proxy http://web-proxy.eu.softwaregrp.net:8080

#
# Install Environment Dependencies
#
RUN apt-get -qq update && apt-get -qq -y install unzip xvfb libxi6 libgconf-2-4
RUN mkdir -p /usr/share/man/man1 && apt-get install -y default-jre

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

#
# Create Directory
#
RUN mkdir -p ux-aspects-e2e

#
# Copy required files
#
COPY ["package.json", "package-lock.json", "Gruntfile.js", "tslint.json", "tsconfig.json", "/ux-aspects-e2e/"]
COPY grunt /ux-aspects-e2e/grunt
COPY scripts /ux-aspects-e2e/scripts
COPY configs /ux-aspects-e2e/configs

#
# Navigate the the working directory
#
WORKDIR /ux-aspects-e2e

#
# Install Dependencies
#
RUN ["npm", "ci"]

#
# Set the entry point
#
CMD npm run test:e2e