# Portfolio Website - Multi-stage Docker Build
# Lightweight nginx-based static site container

# Build stage (for future use with build tools)
FROM node:20-alpine AS builder
WORKDIR /app
# Placeholder for future build steps (npm install, build, etc.)
COPY src/ ./src/

# Production stage
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY src/nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY src/index.html /usr/share/nginx/html/

# Add non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Run as non-root user
USER appuser

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
