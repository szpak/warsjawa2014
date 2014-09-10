# Meteor development container
FROM node

MAINTAINER Tomasz Netczuk <contact@netczuk.pl>

RUN apt-get -y update --fix-missing
RUN apt-get -y install curl
RUN apt-get -y install procps
RUN curl https://install.meteor.com | /bin/sh

RUN npm install fibers
RUN npm install underscore
RUN npm install source-map-support
RUN npm install semver

EXPOSE 3000

ADD . /workshops
ADD ./src /workshops/src

WORKDIR /workshops

RUN meteor bundle bundle.tgz
RUN cd /; tar zxvf /workshops/bundle.tgz
CMD cd /bundle; node main.js
