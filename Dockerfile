FROM ubuntu:14.04

RUN apt-get -y update --fix-missing
RUN apt-get -y install jpegoptim
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
RUN pip install pyyaml
RUN pip install Flask
RUN pip install pymongo
RUN pip install flanker
RUN apt-get -y install nginx

ADD ./app /warsjawa/app
#RUN find /warsjawa -type f -name "*.jpg" -o -name "*.jpeg" | xargs -l jpegoptim --strip-all
RUN python /warsjawa/app/buildsite.py

EXPOSE 80
EXPOSE 81

CMD /bin/bash /warsjawa/app/runsite.sh
