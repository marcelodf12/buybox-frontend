FROM nginx:alpine
COPY "./dist/tracking-system" "/usr/share/nginx/html"
EXPOSE 80