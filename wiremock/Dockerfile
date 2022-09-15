FROM fabric8/java-alpine-openjdk8-jre:1.6.2 

# meta
LABEL maintainer="mockware.xyz"

# vars
ENV WIREMOCK_VERSION 2.33.2

# new directories
RUN mkdir /var/wiremock
RUN mkdir /var/wiremock/mappings

# default directory
WORKDIR /var/wiremock

# download wiremock stand alone build
RUN wget -O /var/wiremock/wiremock-standalone.jar https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-jre8-standalone/$WIREMOCK_VERSION/wiremock-jre8-standalone-$WIREMOCK_VERSION.jar


# start wiremock
CMD java -jar /var/wiremock/wiremock-standalone.jar
