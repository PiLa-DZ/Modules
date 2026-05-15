### Bcrypt Hash Validation with Zod & TypeScript

```bash
npm install bcrypt
npm i -D @types/bcrypt

# $2a$ 12 $ R9h/cQ4vM8J2eD1X7bY3zO  6wN5vU4tS3rE2qW1pA0oI9nM8lK7jH6gA
#   │    │   └───────────┬────────┘  └────────────────┬──────────────┘
#   │    │         Salt (22 chars)             Hash (31 chars)
#   │    └─ Cost Factor (2 digits)
#   └─ Algorithm Version ($2a$, $2b$, or $2y$)
```

```ts
import z from "zod";
import bcrypt from "bcrypt";

// 1. Define the Bcrypt Regex & Schema
const bcryptRegex = /^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;

const bcryptHashSchema = z
  .string({
    required_error: "Bcrypt hash is required.",
    invalid_type_error: "Bcrypt hash must be a valid text string.",
  })
  .trim()
  .regex(bcryptRegex, { message: "Invalid bcrypt hash format." });

// 2. Real-World Async Test Suite
async function runRealWorldTest() {
  const plainTextPassword = "SuperSecretPassword123!";
  const saltRounds = 10;

  const generatedHash = await bcrypt.hash(plainTextPassword, saltRounds);
  const zodResult = bcryptHashSchema.safeParse(generatedHash);

  if (zodResult.success) {
    console.log(`Success`);
  } else {
    console.error(`${zodResult.error.issues[0]?.message}`);
  }

  const badHash = generatedHash.substring(0, generatedHash.length - 5); // Chop off the end
  const badResult = bcryptHashSchema.safeParse(badHash);

  if (!badResult.success) {
    console.log(badResult.error.issues[0]?.message);
    console.log(badHash);
    console.log(bcryptHashSchema.safeParse(plainTextPassword));
  }
}

runRealWorldTest();
```
