# Meteor development container
FROM ubuntu:14.04

MAINTAINER Tomasz Netczuk <contact@netczuk.pl>

RUN apt-get -y update --fix-missing
RUN apt-get -y install curl
RUN curl https://install.meteor.com | /bin/sh

EXPOSE 3000

ADD . /workshops
WORKDIR /workshops