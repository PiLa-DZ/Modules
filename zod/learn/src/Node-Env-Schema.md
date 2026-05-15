### Advanced NODE_ENV Validation with Zod Enums & Pipes

> [!NOTE]
> This is `zod version 3.25.76`

```ts
import z from "zod";

// 1. Define the standalone enum schema
const envEnum = z.enum(["development", "production", "test"], {
  message: "NODE_ENV must be exactly 'development', 'production', or 'test'.",
});

// 2. Use .pipe() to trim the string BEFORE passing it into the enum
const nodeEnvSchema = z
  .string({
    required_error: "NODE_ENV is required.",
    invalid_type_error: "NODE_ENV must be a valid text string.",
  })
  .trim()
  .toLowerCase()
  .pipe(envEnum); // Pipes the trimmed string into the enum validator

type NodeEnv = z.infer<typeof nodeEnvSchema>;

function testNodeEnv(env: NodeEnv) {
  const data = nodeEnvSchema.safeParse(env);

  if (data.success) {
    console.log(`Success: Environment set to "${data.data}".`);
  } else {
    console.error(data.error.issues[0]?.message);
  }
}

// ==========================================
// TEST CASES
// ==========================================

testNodeEnv("development"); // Success: Environment set to "development".
testNodeEnv("test"); // Success: Environment set to "test".
testNodeEnv("staging"); // NODE_ENV must be exactly 'development', 'production', or 'test'.
testNodeEnv(); // NODE_ENV is required.
testNodeEnv(null); // NODE_ENV must be a valid text string.
```
