# Build stage
FROM node:18-alpine as build

ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
# Serve stage
# Serve stage
FROM nginx:stable-alpine as serve
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Optional: If you need to customize Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf


CMD ["/entrypoint.sh"]
