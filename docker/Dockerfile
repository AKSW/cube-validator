FROM node:5

MAINTAINER Georges Alkhouri <georges.alkhouri@stud.htwk-leipzig.de>

RUN apt-get update
RUN apt-get install -y nano git

ENV TERM xterm
ENV PROJECT /cube-validator
ENV APP /app
ENV VALIDATE /validate

COPY run.sh /run.sh
COPY validate.js /validate/validate.js

VOLUME /app

RUN npm install -g typings 

CMD ["/run.sh"]
