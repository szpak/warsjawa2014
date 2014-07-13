#!/bin/bash
docker build -t warsjawa .
docker stop warsjawa
docker rm warsjawa
docker run --name warsjawa -d -p 80:80 warsjawa
