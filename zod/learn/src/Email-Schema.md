### Production-Ready Email Validation with Zod & TypeScript

A clean email validation schema
bounds directly with database layer constraints—specifically
catching length-overflow issues targeting standard `VARCHAR(191)` columns
before they trigger database-level crashes.

> [!NOTE]
> This is `zod version 3.25.76`

```ts
import z from "zod";

const emailSchema = z
  .string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a valid text string.",
  })
  .trim() // Automatically removes accidental whitespace from the beginning or end
  .toLowerCase()
  .email({ message: "Invalid email address format." })
  .max(191, { message: "Email cannot exceed 191 characters." });

// NOTE: Ensure the max length matches your database schema to prevent unhandled SQL errors.
// For instance, ORMs defaults to VARCHAR(191) for MySQL unique index constraints.

function testEmail(email: any) {
  const data = emailSchema.safeParse(email);

  if (data.success) {
    console.log(`Success: "${data.data}" is a valid email.`);
  } else {
    console.error(data.error.issues[0]?.message);
  }
}

// ==========================================
// TEST CASES
// ==========================================

// Valid Emails
testEmail("user@gmail.com"); // Success: "user@gmail.com" is a valid email.
testEmail("  USER@Gmail.com  "); // Success: "user@gmail.com" (Notice trimming and casing adjustment)

// Invalid Emails
testEmail("plaintext"); // Invalid email address format.
testEmail("@domain.com"); // Invalid email address format.
testEmail("user@.com"); // Invalid email address format.

// Missing / Incorrect Types
testEmail(undefined); // Email is required.
testEmail(null); // Email must be a valid text string.

// ==========================================
// EDGE CASE: Database Character Limits
// Example SQL Column Rule: `email` VARCHAR(191) NOT NULL
// ==========================================

// Creating an exact 191-character email string ('a' repeated 181 times + '@gmail.com' [10 chars])
const maxValidEmail = `${"a".repeat(181)}@gmail.com`;
console.log(`Testing maximum length: ${maxValidEmail.length} chars`);

// This passes validation flawlessly
testEmail(maxValidEmail); // Success: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com" is a valid email.

// Adding characters makes it cross the 191 threshold, catching the error before it hits SQL
testEmail(`too_long_${maxValidEmail}`); // Email cannot exceed 191 characters.
```
