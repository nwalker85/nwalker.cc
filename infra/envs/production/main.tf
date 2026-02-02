# Portfolio Infrastructure - Production Environment
# Deploys ECS service for nwalker.cc (uses shared infrastructure from staging)

terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "nwalker-portfolio-terraform-state"
    key            = "production/terraform.tfstate"
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
      Environment = "production"
      ManagedBy   = "terraform"
      Repository  = "gitlab.ravenhelm.dev/nwalker85/portfolio"
    }
  }
}

locals {
  environment = "production"
}

# Reference staging state for shared resources
data "terraform_remote_state" "staging" {
  backend = "s3"
  config = {
    bucket = "nwalker-portfolio-terraform-state"
    key    = "staging/terraform.tfstate"
    region = "us-east-1"
  }
}

# Get VPC details from staging
data "aws_vpc" "main" {
  id = data.terraform_remote_state.staging.outputs.vpc_id
}

data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.main.id]
  }
  filter {
    name   = "tag:Type"
    values = ["private"]
  }
}

# Secrets Manager for Production
module "secrets" {
  source = "../../modules/secrets"

  project     = var.project
  environment = local.environment
}

# ECS Service for Production
module "ecs_production" {
  source = "../../modules/ecs"

  project               = var.project
  environment           = local.environment
  aws_region            = var.aws_region
  vpc_id                = data.aws_vpc.main.id
  private_subnet_ids    = data.aws_subnets.private.ids
  alb_security_group_id = data.terraform_remote_state.staging.outputs.alb_security_group_id
  target_group_arn      = data.terraform_remote_state.staging.outputs.production_target_group_arn
  container_image       = "${data.terraform_remote_state.staging.outputs.ecr_repository_url}:${var.image_tag}"
  container_port        = var.container_port
  task_cpu              = 512
  task_memory           = 1024
  desired_count         = 2
  use_spot              = false # Production uses on-demand for reliability
  health_check_path     = var.health_check_path
  secrets_arn           = module.secrets.secret_arn
  enable_secrets_access = true
  log_retention_days    = 30

  enable_container_insights = true

  environment_variables = [
    {
      name  = "NODE_ENV"
      value = "production"
    },
    {
      name  = "PORT"
      value = tostring(var.container_port)
    }
  ]
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = module.ecs_production.cluster_name
}

output "ecs_service_name" {
  description = "ECS service name for production"
  value       = module.ecs_production.service_name
}

output "log_group_name" {
  description = "CloudWatch log group name"
  value       = module.ecs_production.log_group_name
}
