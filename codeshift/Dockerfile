FROM node:11

RUN npm install -g jscodeshift
VOLUME /var/local/codeshift
COPY codeshift /var/local/codeshift
COPY codeshift/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
