#!/bin/bash
CONTAINER_NAME=$1
PORT=$2
BACKEND_NAME=$3

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}
docker build -t ${CONTAINER_NAME} .
docker run --name ${CONTAINER_NAME} --link ${BACKEND_NAME}:backend -d -p ${PORT}:80 ${CONTAINER_NAME}
