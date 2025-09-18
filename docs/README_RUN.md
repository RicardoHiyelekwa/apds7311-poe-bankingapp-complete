# Run instructions
1. docker compose up --build -d
2. docker compose exec backend npm run seed
3. Open http://localhost:3000
4. Register a customer or use employee: employee1@example.com / Employee@1234
5. Customer creates transaction; employee approves; customer will see notification within ~5s (polling)
