# Meteor development container
FROM node

MAINTAINER Tomasz Netczuk <contact@netczuk.pl>

RUN apt-get -y update --fix-missing
RUN apt-get -y install curl
RUN apt-get -y install procps
RUN curl https://install.meteor.com | /bin/sh
RUN npm install -g meteorite

EXPOSE 3000

ADD . /workshops
WORKDIR /workshops

RUN mrt add foundation
RUN mrt add router
