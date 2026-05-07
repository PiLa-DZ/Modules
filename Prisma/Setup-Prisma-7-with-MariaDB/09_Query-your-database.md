# Query your database

```bash
nvim src/server.ts
```

```ts
import { prisma } from "./lib/db.js";

const createNewUser = async () => {
  const result = await prisma.user.create({ data: { name: "Nabil" } });
  console.log(result);
};

createNewUser()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

```bash
# NOTE: You need to install tsx if not exists
npx tsx src/server.ts
```
