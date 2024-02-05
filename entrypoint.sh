#!/bin/sh
# Substitute the PORT environment variable and start Nginx
envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'