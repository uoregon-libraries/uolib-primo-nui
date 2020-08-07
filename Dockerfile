FROM node:10.15.3

ENV NPM_CONFIG_LOGLEVEL info

RUN git clone https://github.com/ExLibrisGroup/primo-explore-devenv.git /home/node/primo-explore-devenv
WORKDIR /home/node/primo-explore-devenv

RUN npm install -g gulp
RUN npm install
RUN npm rebuild node-sass

COPY ./custom /home/node/primo-explore-devenv/primo-explore/custom/
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8003
EXPOSE 3001

ENTRYPOINT ["/docker-entrypoint.sh"]
