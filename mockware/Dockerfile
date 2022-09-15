FROM nginx:latest
## Copy a new configuration file setting listen port to 8080
COPY ./site.conf /etc/nginx/templates/default.conf.template
## Copy the static files
COPY ./build /usr/share/nginx/html

EXPOSE 8080
## Run nginx
# CMD ["nginx", "-g", "daemon off;"]