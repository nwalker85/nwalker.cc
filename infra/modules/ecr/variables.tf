variable "repository_name" {
  description = "Name of the ECR repository"
  type        = string
}

variable "allow_push_principals" {
  description = "List of AWS principals allowed to push to the repository"
  type        = list(string)
  default     = null
}
