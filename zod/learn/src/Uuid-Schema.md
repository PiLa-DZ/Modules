### Strict UUID Validation & Sanitization Schema with Zod

Check out the snippet below to see how cleanly it handles bad formats,
null inputs, and edge cases! 🛠️

> [!NOTE]
> This is `zod version 3.25.76`
> Install `uuid` module if you need

```ts
import z from "zod";
import { v4 as uuidv4 } from "uuid";

const uuidSchema = z
  .string({
    required_error: "UUID is required.",
    invalid_type_error: "UUID must be a valid text string.",
  })
  .trim() // Safely removes accidental spaces around the token
  .toLowerCase() // Standardizes UUIDs (e.g., standard hex letters a-f should be lowercase)
  .uuid({ message: "Invalid UUID format." });

type Uuid = z.infer<typeof uuidSchema>;

function testUuid(uuid: Uuid) {
  // Uses 'any' to safely process missing or wrong types
  const data = uuidSchema.safeParse(uuid);

  if (data.success) {
    console.log(`Success: "${data.data}" is a valid UUID.`);
  } else {
    console.error(data.error.issues[0]?.message);
  }
}

// ==========================================
// TEST CASES
// ==========================================

// Valid UUIDs
testUuid(uuidv4()); // Success: Valid generated dynamic UUID string.
testUuid("  123e4567-e89b-12d3-a456-426614174000  "); // Success: Trims spaces cleanly.
testUuid("123E4567-E89B-12D3-A456-426614174000"); // Success: Normalizes uppercase hex to lowercase.

// Invalid UUIDs
testUuid("not-a-uuid"); // Invalid UUID format.
testUuid("123e4567-e89b-12d3-a456"); // Invalid UUID format. (Too short / missing chunks)

// Missing / Incorrect Types
testUuid(undefined); // UUID is required.
testUuid(null); // UUID must be a valid text string.
testUuid(1234567890); // UUID must be a valid text string.
```
