# APDS7311 - Banking App (Complete)
This archive contains a complete Docker-ready project for the POE:
- Backend (Node/Express + Mongoose) with registration, separate customer/employee login, transactions (ZAR), approval workflow and notifications via polling.
- Frontend (React + Bootstrap) with Register, Customer login, Employee login, Dashboards.
- Dockerfiles and docker-compose.yml to run MongoDB, backend, frontend.
- Seed script to create an employee account (customer register themselves).

Run (after extracting):
1. docker compose up --build -d
2. docker compose exec backend npm run seed
3. Open http://localhost:3000
