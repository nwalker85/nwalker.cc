# Portfolio Infrastructure - Staging Environment
# Deploys all modules for staging.nwalker.cc

terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "nwalker-portfolio-terraform-state"
    key            = "staging/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "nwalker-portfolio-terraform-locks"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project
      Environment = "staging"
      ManagedBy   = "terraform"
      Repository  = "gitlab.ravenhelm.dev/nwalker85/portfolio"
    }
  }
}

locals {
  environment = "staging"
}

# VPC
module "vpc" {
  source = "../../modules/vpc"

  project            = var.project
  vpc_cidr           = var.vpc_cidr
  enable_nat_gateway = true
}

# ECR Repository (shared across environments)
module "ecr" {
  source = "../../modules/ecr"

  repository_name = "${var.project}-website"
}

# Application Load Balancer
module "alb" {
  source = "../../modules/alb"

  project                    = var.project
  vpc_id                     = module.vpc.vpc_id
  vpc_cidr                   = module.vpc.vpc_cidr
  public_subnet_ids          = module.vpc.public_subnet_ids
  domain_name                = var.domain_name
  subject_alternative_names  = ["staging.${var.domain_name}"]
  container_port             = var.container_port
  health_check_path          = var.health_check_path
  enable_deletion_protection = false
}

# Secrets Manager
module "secrets" {
  source = "../../modules/secrets"

  project     = var.project
  environment = local.environment
}

# ECS Service for Staging
module "ecs_staging" {
  source = "../../modules/ecs"

  project               = var.project
  environment           = local.environment
  aws_region            = var.aws_region
  vpc_id                = module.vpc.vpc_id
  private_subnet_ids    = module.vpc.private_subnet_ids
  alb_security_group_id = module.alb.alb_security_group_id
  target_group_arn      = module.alb.staging_target_group_arn
  container_image       = "${module.ecr.repository_url}:${var.image_tag}"
  container_port        = var.container_port
  task_cpu              = 256
  task_memory           = 512
  desired_count         = 1
  use_spot              = true # Cost savings for staging
  health_check_path     = var.health_check_path
  secrets_arn           = module.secrets.secret_arn
  log_retention_days    = 7

  environment_variables = [
    {
      name  = "NODE_ENV"
      value = "staging"
    },
    {
      name  = "PORT"
      value = tostring(var.container_port)
    }
  ]
}

# Outputs for DNS configuration in Cloudflare
output "alb_dns_name" {
  description = "ALB DNS name for Cloudflare CNAME record"
  value       = module.alb.alb_dns_name
}

output "alb_zone_id" {
  description = "ALB zone ID for Cloudflare alias record"
  value       = module.alb.alb_zone_id
}

output "certificate_validation_options" {
  description = "DNS validation records needed for ACM certificate"
  value       = module.alb.certificate_domain_validation_options
}

output "ecr_repository_url" {
  description = "ECR repository URL for pushing images"
  value       = module.ecr.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = module.ecs_staging.cluster_name
}

output "ecs_service_name" {
  description = "ECS service name for staging"
  value       = module.ecs_staging.service_name
}

output "vpc_id" {
  description = "VPC ID for production reference"
  value       = module.vpc.vpc_id
}

output "private_subnet_ids" {
  description = "Private subnet IDs for production reference"
  value       = module.vpc.private_subnet_ids
}

output "alb_security_group_id" {
  description = "ALB security group ID for production reference"
  value       = module.alb.alb_security_group_id
}

output "production_target_group_arn" {
  description = "Production target group ARN"
  value       = module.alb.production_target_group_arn
}
