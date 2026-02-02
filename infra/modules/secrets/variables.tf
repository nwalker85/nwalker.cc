variable "project" {
  description = "Project name for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment name (staging, production)"
  type        = string
}

variable "recovery_window_days" {
  description = "Number of days to retain secret after deletion (0 for immediate)"
  type        = number
  default     = 7
}

variable "create_initial_version" {
  description = "Create an initial version of the secret"
  type        = bool
  default     = true
}

variable "initial_secret_values" {
  description = "Initial key-value pairs for the secret"
  type        = map(string)
  default     = {}
  sensitive   = true
}
