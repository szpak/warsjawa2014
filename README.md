Warsjawa
========

We are using [boot2docker](http://boot2docker.io/) for serving docker on MacOs.

Build
-----
In order to create image:

	docker build -t warsjawa .

Run
---
In order to run the image:

	docker run -i -t -p 80:80 warsjawa

Warsjawa site will be available on docker IP on port 80.

Develop
-------
Rebuild your boot2docker image with sharing additions: [see](https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c). 

Just replace `boot2docker.iso` and mount User's folder: `VBoxManage sharedfolder add boot2docker-vm -name home -hostpath /Users`.

Run the container.

	$ docker run -i -t -p 80:80 -v [WARSJAWA REPOSITORY PATH]:/warsjawa warsjawa /bin/bash

Go to app folder, do cool stuff. 

	$ cd /warsjawa/app

Rebuild page.

	$ sh build.sh

Start the server and enjoy.

	$ nginx -c /warsjawa/app/nginx.conf &