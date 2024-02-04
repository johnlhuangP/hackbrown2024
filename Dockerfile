FROM node:16-alpine as build

WORKDIR /app
# Example Dockerfile snippet
# Set NODE_OPTIONS environment variable
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]