FROM ubuntu:14.04

RUN apt-get -y update
RUN apt-get -y install git-core
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN npm install -g bower
RUN npm install -g grunt-cli
RUN apt-get -y install ruby
RUN gem install foundation
RUN gem install compass
RUN apt-get -y install python-dev
RUN apt-get -y install python-pip
RUN pip install jinja2
RUN apt-get -y install nginx
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

ADD ./app /warsjawa/app
RUN python /warsjawa/app/buildsite.py

EXPOSE 80
CMD nginx -c /warsjawa/app/nginx.conf