# Multi-Tier AWS Project

A production-ready, secure multi-tier web application deployed on AWS using Docker containers.

## 🌐 Live Demo
**Frontend:** https://d3bjb94ee09h7w.cloudfront.net

## 🏗️ Architecture Overview
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

## ☁️ AWS Services Used

| Service | Purpose |
|---------|---------|
| VPC | Custom network (10.0.0.0/16) with 2 public + 2 private subnets across 2 AZs |
| Internet Gateway | Public internet access for public subnets |
| NAT Gateway | Outbound internet access for private subnets |
| Security Groups | Traffic control for ALB, ECS, and RDS |
| ECR | Docker image registry |
| ECS Fargate | Serverless container deployment |
| ALB | Load balancing and traffic distribution |
| Auto Scaling | CPU-based scaling (70% threshold) |
| RDS PostgreSQL | Managed database in private subnet |
| S3 | Static frontend hosting |
| CloudFront | Global CDN for frontend |
| CodePipeline | CI/CD automation |
| CodeBuild | Automated build and deployment |
| CloudWatch | Monitoring dashboard |

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express + Sequelize ORM
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose

## 🔒 Security Implementation

- Backend only accessible through ALB (not directly from internet)
- RDS only accessible from ECS (not from internet)
- SSL enabled on RDS connection
- Separate Security Groups for ALB, ECS, and RDS
- Private subnets for backend and database

## 🔄 CI/CD Pipeline

- Push to GitHub → CodePipeline triggers automatically
- Backend: CodeBuild → Docker build → ECR push → ECS deploy
- Frontend: CodeBuild → npm build → S3 upload → CloudFront invalidate

## 📊 Monitoring

- CloudWatch Dashboard with:
  - ECS CPU + Memory utilization
  - ALB request count
  - RDS metrics

## 💻 Local Development

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
