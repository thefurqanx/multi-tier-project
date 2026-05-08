# 🚀 Multi-Tier Production AWS Deployment: Case Study

A production-ready, secure multi-tier web application (React + Node.js + PostgreSQL) deployed on AWS using serverless containers and automated CI/CD pipelines.

**🌐 Live Demo:** [https://d3bjb94ee09h7w.cloudfront.net](https://d3bjb94ee09h7w.cloudfront.net)

---

## 🏗️ Architecture Overview

<img width="1440" height="1254" alt="image" src="https://github.com/user-attachments/assets/63b73223-ad92-4bb9-bbd1-940a75815b62" />

*High-level representation of the VPC design, traffic routing, and component isolation.*

---

## 📖 1. The Problem (Challenge)
Modern web apps need more than just working code — they need secure, scalable, and cost-conscious infrastructure. Key pain points addressed in this project:

* **Security Exposure:** Avoided the common mistake of running everything on public subnets.
* **HTTPS + Mixed Content:** Solved the challenge of serving a React app over HTTPS calling an HTTP API without a custom domain/ACM certificate.
* **Operational Overhead:** Eliminated the need for manual OS patching and EC2 management.
* **No CI/CD:** Replaced manual Docker builds and S3 uploads with automated workflows.

---

## 🏗️ 2. The Solution (Key Components)

I designed a layered AWS architecture from scratch as shown in the diagram:

* **Network Isolation (VPC):** Custom VPC (Mumbai region) with 2 public and 2 private subnets across 2 Availability Zones. Backend and Database live in private subnets with **zero direct internet exposure**.
* **Serverless Containers (ECS Fargate):** Node.js API runs on Fargate, scaling between 1–3 tasks automatically based on CPU (70% threshold).
* **Static Frontend at the Edge (S3 + CloudFront):** React build served via CloudFront for global CDN caching and minimal latency.
* **The HTTPS Workaround:** Since I didn't use a custom domain, I configured CloudFront with two origins:
    * `S3` for `/*` (Static content)
    * `ALB` for `/api/*` (Dynamic API calls)
    This allowed the React app to call the API over HTTPS through CloudFront, solving the mixed-content block.
* **Managed Database (RDS):** PostgreSQL 18 in a private subnet, accessible only via `ecs-sg` security group.

---

## 🛠️ 3. Tech Stack & AWS Services

| Category | Tools / Services |
| :--- | :--- |
| **Frontend** | React.js, S3, CloudFront |
| **Backend** | Node.js, Express, Sequelize ORM, ECS Fargate, ECR |
| **Database** | RDS PostgreSQL 18 |
| **Networking** | VPC (10.0.0.0/16), NAT Gateway, ALB, Security Groups |
| **DevOps** | AWS CodePipeline, CodeBuild, GitHub Actions |
| **Monitoring** | CloudWatch Dashboards |

---

## 🔄 4. CI/CD Pipeline Logic
Every `git push` triggers two separate pipelines:
1.  **Backend:** GitHub → CodePipeline → CodeBuild (Docker Image) → ECR → ECS Service Update.
2.  **Frontend:** GitHub → CodePipeline → CodeBuild (npm build) → S3 Sync → CloudFront Invalidation.

---

## 📊 5. Key Engineering Decisions

| Decision | Why It Matters |
| :--- | :--- |
| **Fargate over EC2** | No OS management, serverless scaling. |
| **S3+CloudFront** | Best practice for static assets; reduces container load. |
| **CloudFront /api/* Behavior** | Solved SSL/HTTPS issues without purchasing a domain. |
| **Private Subnets** | Defense-in-depth network security for data/API. |
| **NAT Gateway** | Allows private instances to fetch updates without being public. |

---

## 💰 6. Project Cost Analysis (ap-south-1)
*Estimated Monthly Cost: ~$85–108*
> **Note:** As this is a learning project, I utilize a mitigation strategy: deleting billable resources (NAT Gateway, ALB, RDS) immediately after mentor review, keeping only S3/CloudFront which cost pennies.

---

## 💻 Local Development

1. **Clone the repo:**
   ```bash
   git clone git@github.com:thefurqanx/multi-tier-project.git
   cd multi-tier-project

2. **Setup .env:**
   ```bash
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=testdb

3. **Run with Docker:**
   ```bash
   docker compose up



Frontend: http://localhost:8081

Backend: http://localhost:8080

Major Skills Practiced:
VPC Design • Subnet Strategy • Security Group Layering • IAM • ECS Task Definitions • Environment Injection • CloudFront Behaviors • Buildspec Writing
