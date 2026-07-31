# HRMS (Human Resource Management System)

A production-ready Human Resource Management System built using Fastify, GraphQL, Prisma, PostgreSQL, and React.

The project demonstrates scalable backend architecture, JWT authentication, GraphQL APIs, and modern frontend development practices.

---

## Tech Stack

### Backend

- Fastify
- TypeScript
- Apollo GraphQL
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Redis (Planned)
- Docker

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Apollo Client

---

## Architecture

```
Client (React + Apollo)
        │
GraphQL API
        │
Resolvers
        │
Services
        │
Repositories
        │
Prisma ORM
        │
PostgreSQL
```

---

## Project Structure

```
HRMS/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## Features

### Authentication

- JWT Login
- Register Employee
- Password Hashing
- Role-Based Authorization

### Employee

- Create Employee
- Update Employee
- Delete Employee
- Cursor Pagination
- Search
- Filtering

### Department

- Create
- Update
- Delete

### Attendance

- Check In
- Check Out
- Attendance Reports

### Leave Management

- Apply Leave
- Approve/Reject Leave
- Leave History

### Payroll

- Salary Management
- Payslip Generation

### Dashboard

- Employee Statistics
- Leave Statistics
- Attendance Overview

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

Health Check:

```
GET /health
```

GraphQL Playground:

```
http://localhost:3000/graphql
```

---

## Future Enhancements

- Redis Caching
- File Upload (AWS S3)
- Email Notifications
- Audit Logs
- Docker Deployment
- CI/CD Pipeline
- Unit Testing
- Integration Testing

---

## Author

**Yashvant Yadav**

Senior Backend Engineer

AWS Certified Solutions Architect – Associate

GitHub: https://github.com/yashvantys
