# Production Environment Configuration
aws_region        = "us-east-1"
project           = "portfolio"
container_port    = 3000
health_check_path = "/"
# image_tag is set via CI/CD - no default for safety
