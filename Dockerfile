
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

# Set nginx base image
FROM nginx:latest

EXPOSE 3000
# Copy custom configuration file from the current directory
COPY  nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html






