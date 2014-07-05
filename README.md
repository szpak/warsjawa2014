warsjawa
========

BUILD:
====
docker build -t warsjawa .

RUN NGINX:
====
docker run -i -t -p 80:80  warsjawa

INTERACTIVE RUN (to develop stuff):
====
first you need to rebuild your boot2docker image with sharing: [see](https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c)

docker run -i -t -v /Users/neciu/Dev/www/warsjawa:/warsjawa warsjawa /bin/bash
