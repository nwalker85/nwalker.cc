# Secrets Manager Module for Portfolio Infrastructure
# Creates secrets for application configuration

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

resource "aws_secretsmanager_secret" "main" {
  name                    = "${var.project}/${var.environment}/config"
  description             = "Application configuration for ${var.project} ${var.environment}"
  recovery_window_in_days = var.recovery_window_days

  tags = {
    Name        = "${var.project}-${var.environment}-config"
    Environment = var.environment
  }
}

# Initial secret version with placeholder values
# Actual values should be set manually or via CI/CD
resource "aws_secretsmanager_secret_version" "initial" {
  count     = var.create_initial_version ? 1 : 0
  secret_id = aws_secretsmanager_secret.main.id
  secret_string = jsonencode(merge(
    {
      ENVIRONMENT = var.environment
    },
    var.initial_secret_values
  ))

  lifecycle {
    ignore_changes = [secret_string]
  }
}
