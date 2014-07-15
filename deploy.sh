#!/bin/bash
docker stop $3
docker rm $3
docker build -t $3 .
docker run --name $3 --link $4:db -d -p $1:80 -p $2:81 warsjawa
