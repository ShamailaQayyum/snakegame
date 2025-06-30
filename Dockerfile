# Use official Nginx image
FROM nginx:alpine

# Copy your static files to nginx default directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx starts automatically

