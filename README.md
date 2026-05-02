# Multi-Tier AWS Project

A production-ready, secure multi-tier web application deployed on AWS using Docker containers.

## Live Demo
- **Frontend**: https://d3bjb94ee09h7w.cloudfront.net

## Architecture Overview
Internet
↓
CloudFront (CDN)
↓
S3 (React Static Files)
Internet
↓
ALB (Application Load Balancer)
↓
ECS Fargate (Node.js Backend - Private Subnet)
↓
RDS PostgreSQL (Private Subnet)

## AWS Services Used
- **VPC** - Custom VPC (10.0.0.0/16) with 2 public and 2 private subnets across 2 AZs
- **Internet Gateway** - Public internet access for public subnets
- **NAT Gateway** - Outbound internet access for private subnets
- **Security Groups** - ALB, ECS, and RDS level traffic control
- **ECR** - Docker image registry
- **ECS Fargate** - Serverless container deployment
- **ALB** - Load balancing and traffic distribution
- **Auto Scaling** - CPU-based automatic scaling (70% threshold)
- **RDS PostgreSQL** - Managed database in private subnet
- **S3** - Static frontend hosting
- **CloudFront** - Global CDN for frontend
- **CloudWatch** - Monitoring dashboard (CPU, Memory, Requests, DB metrics)

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## Security Implementation
- Backend only accessible through ALB (not directly from internet)
- RDS only accessible from ECS (not from internet)
- SSL enabled on RDS connection
- Separate Security Groups for ALB, ECS, and RDS
- Private subnets for backend and database

## Local Development

### Prerequisites
- Docker
- Docker Compose
- Node.js + npm

### Setup
1. Clone the repo:
```bash
git clone git@github.com:thefurqanx/multi-tier-project.git
cd multi-tier-project
```

2. Create `.env` file:
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=testdb

3. Run:
```bash
docker compose up
```

4. Access:
- Frontend: http://localhost
- Backend API: http://localhost:8080
Save karo: Ctrl+X → Y → Enter
Phir push karo:
bashgit add README.md
git commit -m "update README with project details"
git push origin main
