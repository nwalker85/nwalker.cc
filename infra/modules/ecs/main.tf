# ECS Module for Portfolio Infrastructure
# Creates ECS Fargate cluster, service, and task definition

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Local values for cluster reference
locals {
  cluster_name = var.use_existing_cluster ? var.existing_cluster_name : aws_ecs_cluster.main[0].name
  cluster_id   = var.use_existing_cluster ? var.existing_cluster_arn : aws_ecs_cluster.main[0].id
  cluster_arn  = var.use_existing_cluster ? var.existing_cluster_arn : aws_ecs_cluster.main[0].arn
}

# ECS Cluster (only created if not using existing)
resource "aws_ecs_cluster" "main" {
  count = var.use_existing_cluster ? 0 : 1
  name  = "${var.project}-cluster"

  setting {
    name  = "containerInsights"
    value = var.enable_container_insights ? "enabled" : "disabled"
  }

  tags = {
    Name = "${var.project}-cluster"
  }
}

# Cluster Capacity Provider (only created if not using existing)
resource "aws_ecs_cluster_capacity_providers" "main" {
  count        = var.use_existing_cluster ? 0 : 1
  cluster_name = aws_ecs_cluster.main[0].name

  capacity_providers = var.use_spot ? ["FARGATE", "FARGATE_SPOT"] : ["FARGATE"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = var.use_spot ? 0 : 100
    capacity_provider = "FARGATE"
  }

  dynamic "default_capacity_provider_strategy" {
    for_each = var.use_spot ? [1] : []
    content {
      base              = 0
      weight            = 100
      capacity_provider = "FARGATE_SPOT"
    }
  }
}

# Security Group for ECS Tasks
resource "aws_security_group" "ecs_tasks" {
  name        = "${var.project}-${var.environment}-ecs-tasks-sg"
  description = "Security group for ECS tasks"
  vpc_id      = var.vpc_id

  ingress {
    description     = "HTTP from ALB"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [var.alb_security_group_id]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project}-${var.environment}-ecs-tasks-sg"
    Environment = var.environment
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "main" {
  name              = "/ecs/${var.project}/${var.environment}"
  retention_in_days = var.log_retention_days

  tags = {
    Name        = "${var.project}-${var.environment}-logs"
    Environment = var.environment
  }
}

# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.project}-${var.environment}-ecs-task-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project}-${var.environment}-ecs-task-execution"
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Allow ECS to pull from ECR
resource "aws_iam_role_policy" "ecs_ecr_policy" {
  name = "${var.project}-${var.environment}-ecr-policy"
  role = aws_iam_role.ecs_task_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ]
        Resource = "*"
      }
    ]
  })
}

# ECS Task Role (for application)
resource "aws_iam_role" "ecs_task" {
  name = "${var.project}-${var.environment}-ecs-task"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project}-${var.environment}-ecs-task"
    Environment = var.environment
  }
}

# Allow task role to access Secrets Manager
resource "aws_iam_role_policy" "ecs_secrets_policy" {
  count = var.enable_secrets_access ? 1 : 0
  name  = "${var.project}-${var.environment}-secrets-policy"
  role  = aws_iam_role.ecs_task.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = var.secrets_arn
      }
    ]
  })
}

# ECS Task Definition
resource "aws_ecs_task_definition" "main" {
  family                   = "${var.project}-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "${var.project}-${var.environment}"
      image     = var.container_image
      essential = true

      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]

      environment = var.environment_variables

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.main.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:${var.container_port}${var.health_check_path} || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = {
    Name        = "${var.project}-${var.environment}-task"
    Environment = var.environment
  }
}

# ECS Service
resource "aws_ecs_service" "main" {
  name                               = "${var.project}-${var.environment}"
  cluster                            = local.cluster_id
  task_definition                    = aws_ecs_task_definition.main.arn
  desired_count                      = var.desired_count
  launch_type                        = var.use_spot ? null : "FARGATE"
  platform_version                   = "LATEST"
  health_check_grace_period_seconds  = 60
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  # When use_spot is true, guarantee 1 on-demand task (base) so spot
  # interruptions never take the service fully offline.  Additional
  # tasks (if scaled) prefer spot for cost savings.
  dynamic "capacity_provider_strategy" {
    for_each = var.use_spot ? [
      { provider = "FARGATE", base = 1, weight = 0 },
      { provider = "FARGATE_SPOT", base = 0, weight = 100 },
    ] : []
    content {
      capacity_provider = capacity_provider_strategy.value.provider
      base              = capacity_provider_strategy.value.base
      weight            = capacity_provider_strategy.value.weight
    }
  }

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "${var.project}-${var.environment}"
    container_port   = var.container_port
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = {
    Name        = "${var.project}-${var.environment}-service"
    Environment = var.environment
  }
}
