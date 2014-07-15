Run
======
This application consists of two containers. warsjawa which is web container. db which is mongo container.

Build and run DB image
-----
Build [mongodb](https://docs.docker.com/examples/mongodb/Dockerfile) image. Run it with `--name parameters`. For example

	$ docker build -tag db .
	$ docker run --name db -d db


Build and run web image
-----
In order to create web:

	$ docker build -t warsjawa .

In order to run the web:

	$ docker run -d -p --link db:db -p 80:80 -p 81:81 warsjawa

Warsjawa site will be available on docker IP on port 80. API is available at `:81/api`.

Develop
=======
(OSX Only) Rebuild your boot2docker image with sharing additions: [see](https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c). Replace `boot2docker.iso` and mount User's folder: `VBoxManage sharedfolder add boot2docker-vm -name home -hostpath /Users`.

Run the container.

	$ docker run -i -t -p 80:80 -v [WARSJAWA REPOSITORY PATH]:/warsjawa warsjawa /bin/bash

Go to app folder, do cool stuff. 

	$ cd /warsjawa/app

Rebuild page.

	$ sh build.sh

Start the server and enjoy.

	$ nginx -c /warsjawa/app/nginx.conf &

Deploy
======
Just push to the master.

Api
========

Speakers
------
Get all speakers

	/api/speakers


