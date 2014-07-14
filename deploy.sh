#!/bin/bash
docker stop warsjawa
docker rm warsjawa
docker build -t warsjawa .
docker run --name warsjawa --link db:db -d -p 80:80 -p 81:81 warsjawa
