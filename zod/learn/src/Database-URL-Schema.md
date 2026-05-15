### Database Connection String Validation with Zod & TypeScript

> [!NOTE]
> This is `zod version 3.25.76`

```js
import z from "zod";

const dbUrlSchema = z
  .string({
    required_error: "Database URL is required.",
    invalid_type_error: "Database URL must be a valid text string.",
  })
  .trim()
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return (
          parsed.protocol === "mysql:" || parsed.protocol === "postgresql:"
        );
      } catch {
        return false; // Fails if the URL constructor crashes (malformed string)
      }
    },
    {
      message:
        "Database URL must be a valid connection string starting with mysql:// or postgresql://",
    },
  );

function testDbUrl(url: any) {
  const data = dbUrlSchema.safeParse(url);

  if (data.success) {
    console.log(`Success: "${data.data}" is a valid database URL.`);
  } else {
    console.error(`${data.error.issues[0]?.message}`);
  }
}

// ==========================================
// TEST CASES
// ==========================================

testDbUrl("mysql://admin:pass@localhost:3306/db"); // Success!
testDbUrl("postgresql://user:pass@localhost:5432/db"); // Success!

testDbUrl("random://user:pass@localhost:5432/db"); // Must start with mysql:// or postgresql://
testDbUrl("not-even-a-url"); // Fails native URL parsing entirely
```
