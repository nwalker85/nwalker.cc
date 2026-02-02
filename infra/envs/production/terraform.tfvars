# Production Environment Configuration
aws_region        = "us-east-1"
project           = "portfolio"
container_port    = 80
health_check_path = "/health"
# image_tag is set via CI/CD - no default for safety
