# Portfolio Website - Multi-stage Docker Build
# Lightweight nginx-based static site container

# Production stage
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY src/nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY src/index.html /usr/share/nginx/html/
COPY src/resume.pdf /usr/share/nginx/html/
COPY src/headshot.jpg /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
