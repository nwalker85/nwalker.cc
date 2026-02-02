# Staging Environment Configuration
aws_region        = "us-east-1"
project           = "portfolio"
domain_name       = "nwalker.cc"
vpc_cidr          = "10.0.0.0/16"
container_port    = 80
health_check_path = "/health"
image_tag         = "latest"
