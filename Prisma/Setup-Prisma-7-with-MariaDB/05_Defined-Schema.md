```bash
nvim prisma/schema.prisma
```

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client"
  output   = "../src/generated/client" // Recommended: Keep generated types in your src
}

datasource db {
  provider = "mysql"
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```
