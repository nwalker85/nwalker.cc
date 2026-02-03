variable "project" {
  description = "Project name for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment name (staging, production)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}

variable "private_subnet_ids" {
  description = "IDs of the private subnets for ECS tasks"
  type        = list(string)
}

variable "alb_security_group_id" {
  description = "ID of the ALB security group"
  type        = string
}

variable "target_group_arn" {
  description = "ARN of the target group for the service"
  type        = string
}

variable "container_image" {
  description = "Docker image to run"
  type        = string
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 80
}

variable "task_cpu" {
  description = "CPU units for the task (256, 512, 1024, 2048, 4096)"
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Memory for the task in MB"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Desired number of tasks"
  type        = number
  default     = 1
}

variable "use_spot" {
  description = "Use Fargate Spot for cost savings (less reliable)"
  type        = bool
  default     = false
}

variable "health_check_path" {
  description = "Path for health check endpoint"
  type        = string
  default     = "/health"
}

variable "environment_variables" {
  description = "Environment variables for the container"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "secrets_arn" {
  description = "ARN of the Secrets Manager secret (optional)"
  type        = string
  default     = null
}

variable "enable_secrets_access" {
  description = "Enable IAM policy for Secrets Manager access"
  type        = bool
  default     = false
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}

variable "enable_container_insights" {
  description = "Enable Container Insights for the cluster"
  type        = bool
  default     = false
}

variable "use_existing_cluster" {
  description = "Use an existing ECS cluster instead of creating a new one"
  type        = bool
  default     = false
}

variable "existing_cluster_name" {
  description = "Name of existing ECS cluster (required if use_existing_cluster is true)"
  type        = string
  default     = null
}

variable "existing_cluster_arn" {
  description = "ARN of existing ECS cluster (required if use_existing_cluster is true)"
  type        = string
  default     = null
}
