# Meteor development container
FROM node

MAINTAINER Tomasz Netczuk <contact@netczuk.pl>

RUN apt-get -y update --fix-missing
RUN apt-get -y install curl
RUN apt-get -y install procps
RUN curl https://install.meteor.com | /bin/sh

EXPOSE 3000

ADD . /workshops
WORKDIR /workshops
