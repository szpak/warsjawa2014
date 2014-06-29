FROM ubuntu

RUN apt-get -y update

RUN apt-get -y install git-core

#RUN apt-get -y install nodejs
#RUN apt-get -y install npm
#RUN ln -s /usr/bin/nodejs /usr/bin/node
#RUN npm install -g bower
#RUN npm install -g grunt-cli

RUN apt-get -y install ruby
RUN gem install foundation
RUN gem install compass

RUN apt-get -y install python
RUN apt-get -y install python-pip
RUN pip install jinja2

#RUN apt-get -y install nginx
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf
#EXPOSE 80

#ADD ./app /warsjawa/app
#RUN python /warsjawa/app/buildsite.py

#CMD nginx -c /warsjawa/app/nginx.conf

