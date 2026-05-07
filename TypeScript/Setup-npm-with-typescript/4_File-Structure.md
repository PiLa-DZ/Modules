```bash
mkdir -p src
touch src/server.ts
touch src/app.ts
mkdir -p src/controllers
mkdir -p src/middleware
mkdir -p src/routes
mkdir -p src/services
mkdir -p src/types
mkdir -p src/lib
```

# 📂 File Structure & Module Map

We will organize the code using an explicit MVC-like architecture pattern.
This decouples our Prisma database queries, validation logic, and routing.

```bash
.
├── src
│   ├── server.ts         # Server network listener (Starts the app)
│   ├── app.ts            # Express application setup
│   ├── controllers       # Route handlers (Request/Response orchestration)
│   ├── middleware        # Global rate limiters & error handlers
│   ├── routes            # API Endpoint definitions
│   ├── services          # Business logic & Prisma interactions
│   ├── types             # Global TypeScript interface definitions
│   └── lib               # Shared utility helpers
├── tests                 # Automated API integration tests
└── tsconfig.json         # TypeScript compiler configurations
```
