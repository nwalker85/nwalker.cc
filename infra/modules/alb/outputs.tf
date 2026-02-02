output "alb_arn" {
  description = "ARN of the Application Load Balancer"
  value       = aws_lb.main.arn
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = aws_lb.main.zone_id
}

output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb.id
}

output "production_target_group_arn" {
  description = "ARN of the production target group"
  value       = aws_lb_target_group.production.arn
}

output "staging_target_group_arn" {
  description = "ARN of the staging target group"
  value       = aws_lb_target_group.staging.arn
}

output "https_listener_arn" {
  description = "ARN of the HTTPS listener"
  value       = aws_lb_listener.https.arn
}

output "certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.main.arn
}

output "certificate_domain_validation_options" {
  description = "Domain validation options for the certificate (for DNS validation)"
  value       = aws_acm_certificate.main.domain_validation_options
}
